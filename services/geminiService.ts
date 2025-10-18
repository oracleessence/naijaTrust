import { GoogleGenAI, Type } from "@google/genai";
import type { Business, Review, User, Reply } from '../types';

interface MockData {
  users: User[];
  businesses: Business[];
  reviews: Review[];
  replies: Reply[];
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateMockData = async (): Promise<MockData> => {
  const prompt = `
    Generate a realistic dataset for a Nigerian customer review platform called "NaijaTrust".
    The data should include 5 users, 10 businesses, 30 reviews, and 7 replies.
    - Users should have Nigerian-sounding names and random-looking phone numbers and emails. Each user must have a 'name' field.
    - IMPORTANT: Ensure the second user in the array has the role 'business_owner'. All other users should have the role 'customer'.
    - Businesses should be in various Nigerian cities (Lagos, Abuja, Port Harcourt, Ibadan, Kano).
    - Business categories should be diverse (e.g., Restaurant, Fashion Designer, Tech Hub, Boutique Hotel, E-commerce Store, Spa).
    - Business names should sound authentically Nigerian.
    - IMPORTANT: Assign 5 of the 10 businesses an 'owner_id' that links them to the business owner user. The other 5 businesses should have a null 'owner_id' to represent unclaimed businesses.
    - All businesses should have a 'logo_url' from picsum.photos and a short 'bio'.
    - Reviews should have Nigerian-sounding customer names.
    - Each review must be linked to a business via 'business_id' and a user via 'user_id'.
    - Ensure ratings are between 1 and 5.
    - Comments should reflect a mix of positive, negative, and neutral experiences, written in a natural, conversational tone, some with Nigerian slang or pidgin.
    - Replies should be a separate list. Each reply must be linked to a review via 'review_id' and a business via 'business_id'. The reply should be professional and relevant to the review.
    - Return the data strictly in the JSON format specified by the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            users: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  phone: { type: Type.STRING },
                  email: { type: Type.STRING },
                  role: { type: Type.STRING },
                  created_at: { type: Type.STRING },
                }
              }
            },
            businesses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  owner_id: { type: Type.STRING, nullable: true },
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  phone: { type: Type.STRING },
                  email: { type: Type.STRING },
                  address: { type: Type.STRING },
                  website: { type: Type.STRING },
                  verified: { type: Type.BOOLEAN },
                  avg_rating: { type: Type.NUMBER },
                  total_reviews: { type: Type.INTEGER },
                  created_at: { type: Type.STRING },
                  updated_at: { type: Type.STRING },
                  logo_url: {type: Type.STRING},
                  bio: {type: Type.STRING},
                },
              },
            },
            reviews: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  business_id: { type: Type.STRING },
                  user_id: { type: Type.STRING },
                  customer_name: { type: Type.STRING },
                  customer_phone: { type: Type.STRING, nullable: true },
                  order_id: { type: Type.STRING, nullable: true },
                  rating: { type: Type.INTEGER },
                  comment: { type: Type.STRING },
                  verified: { type: Type.BOOLEAN },
                  status: { type: Type.STRING },
                  created_at: { type: Type.STRING },
                },
              },
            },
            replies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  review_id: { type: Type.STRING },
                  business_id: { type: Type.STRING },
                  message: { type: Type.STRING },
                  created_at: { type: Type.STRING },
                }
              }
            }
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText);
    return data;
  } catch (error) {
    console.error("Error generating mock data with Gemini:", error);
    throw new Error("Failed to generate mock data.");
  }
};

export const generateReviewSummary = async (reviews: Review[]): Promise<string> => {
  if (reviews.length === 0) {
    return "No reviews available to summarize.";
  }
  const reviewComments = reviews.map(r => `- ${r.comment} (${r.rating}/5)`).join('\n');
  const prompt = `
    You are an AI assistant for NaijaTrust, a Nigerian review platform.
    Analyze the following customer reviews for a business and provide a concise, balanced summary in about 3-4 sentences.
    Highlight the main positive points and common criticisms.
    The tone should be helpful and neutral.
    
    Reviews:
    ${reviewComments}
    
    Summary:
  `;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating review summary:", error);
    return "Could not generate AI summary at this time.";
  }
};

export const moderateReviewContent = async (comment: string, rating: number): Promise<{ score: number; reason: string }> => {
  const prompt = `
    You are a highly-trained content moderation AI for NaijaTrust, a Nigerian review platform. Your task is to analyze a customer review and provide a moderation score from 0 to 100.

    Consider the following factors:
    - Spam/Gibberish: Is the review nonsensical, repetitive, or clearly spam? A very low score (0-20).
    - Abuse/Hate Speech: Does it contain personal attacks, harassment, or hateful language? A very low score (0-20).
    - Relevance: Is the review relevant to a customer experience with a business? Irrelevant content gets a low score.
    - Quality & Detail: Is the review helpful and detailed, or is it very low-effort (e.g., "Good", "Bad")? A low rating (1-2 stars) is fine if it's well-explained. A very short, unhelpful review should get a lower score.

    Review to analyze:
    Rating: ${rating}/5
    Comment: "${comment}"

    Return ONLY a JSON object with two keys: "score" (a number from 0 to 100) and "reason" (a brief, one-sentence explanation for the score).
  `;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            reason: { type: Type.STRING },
          },
        },
      },
    });
    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error moderating review content:", error);
    // Fallback in case of API error
    return { score: 75, reason: "Automatic fallback score due to an error." };
  }
};