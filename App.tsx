import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import BusinessProfilePage from './components/pages/BusinessProfilePage';
import DashboardPage from './components/pages/DashboardPage';
import AboutPage from './components/pages/AboutPage';
import CareersPage from './components/pages/CareersPage';
import ContactPage from './components/pages/ContactPage';
import PricingPage from './components/pages/PricingPage';
import TermsPage from './components/pages/TermsPage';
import PrivacyPage from './components/pages/PrivacyPage';
import ClaimPage from './components/pages/ClaimPage';
import { Business, Review, User, Reply } from './types';
import { generateMockData, moderateReviewContent } from './services/geminiService';
import Spinner from './components/Spinner';
import AuthModal from './components/AuthModal';
import Notification from './components/Notification';


type View = 'home' | 'business' | 'dashboard' | 'about' | 'careers' | 'contact' | 'pricing' | 'terms' | 'privacy' | 'claim';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const fetchInitialData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateMockData();
      setUsers(data.users);
      setBusinesses(data.businesses);
      setReviews(data.reviews);
      setReplies(data.replies);

      // After fetching mock users, check localStorage for a persisted session
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
          const parsedUser: User = JSON.parse(savedUser);
          // Find the full user object from the freshly fetched list
          const fullUser = data.users.find(u => u.id === parsedUser.id);
          if (fullUser) {
              setCurrentUser(fullUser);
          }
      }

    } catch (err) {
      console.error("Failed to fetch initial data:", err);
      setError('Could not load platform data. Please try refreshing the page.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);
  
  // Effect to persist currentUser to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const navigateTo = (newView: View) => {
    setView(newView);
    window.scrollTo(0, 0);
  };
  
  const navigateToBusiness = (businessId: string) => {
    setSelectedBusinessId(businessId);
    navigateTo('business');
  };

  const navigateToHome = () => {
    setSelectedBusinessId(null);
    navigateTo('home');
  };
  
  const navigateToDashboard = () => {
    if (currentUser?.role === 'business_owner') {
      navigateTo('dashboard');
    } else {
      // Prompt non-business owners to log in as one
      handleRequestAuth('signup'); 
    }
  };

  const handleRequestAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };
  
  const handleLogin = () => {
    // Simulate login by picking the first mock user (customer)
    const customer = users.find(u => u.role === 'customer');
    if (customer) {
      setCurrentUser(customer);
    }
    setIsAuthModalOpen(false);
  };

  const handleBusinessLogin = () => {
    // Simulate signup by picking the first business owner
    const owner = users.find(u => u.role === 'business_owner');
    if (owner) {
      setCurrentUser(owner);
      navigateTo('dashboard'); // Seamlessly redirect to dashboard
    }
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    // localStorage is cleared by the useEffect hook
    navigateToHome();
  };

  const handleAddReview = async (newReview: Omit<Review, 'id' | 'status' | 'created_at' | 'verified' | 'user_id' | 'moderation_score'>) => {
    if (!currentUser) {
      handleRequestAuth('login');
      return;
    }
    
    setNotification(null);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const moderation = await moderateReviewContent(newReview.comment, newReview.rating);
    const MODERATION_THRESHOLD = 50;
    
    const finalStatus: Review['status'] = moderation.score < MODERATION_THRESHOLD ? 'flagged' : 'pending';

    const reviewToAdd: Review = {
      ...newReview,
      id: `rev_${Date.now()}`,
      user_id: currentUser.id,
      status: finalStatus,
      verified: false,
      created_at: new Date().toISOString(),
      moderation_score: moderation.score,
    };
    
    setReviews(prevReviews => [reviewToAdd, ...prevReviews]);
    setNotification('Your review has been submitted and is pending approval.');
  };

  const handleAddReply = async (reply: Omit<Reply, 'id' | 'created_at'>) => {
    setNotification(null);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API latency
    const newReply: Reply = {
      ...reply,
      id: `reply_${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setReplies(prevReplies => [newReply, ...prevReplies]);
    setNotification('Your reply has been posted successfully.');
  }

  const handleVerifyBusiness = (businessId: string) => {
    setNotification(null);
    setBusinesses(prevBusinesses =>
      prevBusinesses.map(business =>
        business.id === businessId ? { ...business, verified: true } : business
      )
    );
    setNotification("Verification documents submitted. The business will be marked as verified upon approval.");
  };

  const handleClaimRequest = (businessId: string) => {
    if (!currentUser) {
      setNotification("Please log in or sign up as a business owner to claim a profile.");
      handleRequestAuth('signup');
      return;
    }

    if (currentUser.role !== 'business_owner') {
      setNotification("Only business owners can claim profiles. Please sign up with a business owner account.");
      handleRequestAuth('signup');
      return;
    }

    const alreadyOwnsBusiness = businesses.some(b => b.owner_id === currentUser.id);
    if (alreadyOwnsBusiness) {
      setNotification("You already have a business associated with your account.");
      navigateToDashboard();
      return;
    }

    setBusinesses(prev => prev.map(b =>
      b.id === businessId ? { ...b, owner_id: currentUser.id } : b
    ));

    setNotification("Business claimed successfully! Welcome to your new dashboard.");
    
    setTimeout(() => {
      navigateToDashboard();
    }, 2000); // Give user time to read notification
  };


  const selectedBusiness = businesses.find(b => b.id === selectedBusinessId);
  const ownerBusiness = businesses.find(b => b.owner_id === currentUser?.id);

  const renderContent = () => {
    if (isLoading) {
      return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    }
    if (error) {
      return <div className="text-center py-20 text-red-500">{error}</div>;
    }
    switch (view) {
      case 'dashboard':
        if (currentUser?.role === 'business_owner' && ownerBusiness) {
          const businessReviews = reviews.filter(r => r.business_id === ownerBusiness.id);
          return (
            <DashboardPage
              business={ownerBusiness}
              reviews={businessReviews}
              replies={replies}
              onAddReply={handleAddReply}
              onVerifyBusiness={handleVerifyBusiness}
            />
          );
        }
        // If not a business owner, navigateToDashboard logic will handle the auth prompt
        // and a successful login will re-render to the dashboard correctly.
        // A direct navigation here might cause a flicker or redirect loop, so let nav logic handle it.
        if (!isLoading) navigateToHome();
        return null;

      case 'business':
        if (selectedBusiness) {
          const businessReviews = reviews.filter(r => r.business_id === selectedBusinessId);
          const reviewIds = businessReviews.map(r => r.id);
          const businessReplies = replies.filter(reply => reviewIds.includes(reply.review_id));
          return (
            <BusinessProfilePage 
              business={selectedBusiness} 
              reviews={businessReviews} 
              replies={businessReplies}
              currentUser={currentUser}
              onAddReview={handleAddReview}
              onRequestAuth={() => handleRequestAuth('login')}
              onBack={navigateToHome}
            />
          );
        }
        navigateToHome();
        return null;
      case 'about': return <AboutPage />;
      case 'careers': return <CareersPage />;
      case 'contact': return <ContactPage />;
      case 'pricing': return <PricingPage />;
      case 'claim': 
        return <ClaimPage
          businesses={businesses.filter(b => !b.owner_id)}
          onClaimRequest={handleClaimRequest}
        />;
      case 'terms': return <TermsPage />;
      case 'privacy': return <PrivacyPage />;
      case 'home':
      default:
        return (
          <HomePage
            businesses={businesses}
            reviews={reviews}
            onSelectBusiness={navigateToBusiness}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-800">
      <Header 
        user={currentUser}
        onLogoClick={navigateToHome} 
        onLoginClick={() => handleRequestAuth('login')}
        onSignupClick={() => handleRequestAuth('signup')}
        onLogout={handleLogout}
        onDashboardClick={navigateToDashboard}
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {notification && <Notification message={notification} type="success" onClose={() => setNotification(null)} />}
        {renderContent()}
      </main>
      <Footer 
        onNavigate={navigateTo}
      />
      {isAuthModalOpen && (
        <AuthModal
          mode={authMode}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
          onSignup={handleBusinessLogin}
          onSwitchMode={setAuthMode}
        />
      )}
    </div>
  );
};

export default App;