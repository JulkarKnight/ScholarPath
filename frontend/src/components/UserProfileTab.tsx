import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { User, Camera, Save, LogOut, GraduationCap, Globe, DollarSign, BookOpen, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const UserProfileTab: React.FC = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState<string | null>(null);
  
  // New academic fields
  const [targetCountry, setTargetCountry] = useState('USA');
  const [targetDegree, setTargetDegree] = useState('Masters');
  const [currentDegree, setCurrentDegree] = useState('Bachelors');
  const [cgpa, setCgpa] = useState<string>('');
  const [ieltsScore, setIeltsScore] = useState<string>('');
  const [budget, setBudget] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        if (data.email) setEmail(data.email);
        if (data.fullName) setFullName(data.fullName);
        if (data.bio) setBio(data.bio);
        if (data.profilePicUrl) setProfilePic(data.profilePicUrl);
        if (data.targetCountry) setTargetCountry(data.targetCountry);
        if (data.targetDegree) setTargetDegree(data.targetDegree);
        if (data.currentDegree) setCurrentDegree(data.currentDegree);
        if (data.cgpa !== null) setCgpa(data.cgpa.toString());
        if (data.ieltsScore !== null) setIeltsScore(data.ieltsScore.toString());
        if (data.budget !== null) setBudget(data.budget.toString());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          fullName, 
          bio, 
          profilePicUrl: profilePic,
          targetCountry,
          targetDegree,
          currentDegree,
          cgpa: cgpa ? parseFloat(cgpa) : null,
          ieltsScore: ieltsScore ? parseFloat(ieltsScore) : null,
          budget: budget ? parseFloat(budget) : null
        })
      });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    navigate('/');
  };

  if (loading) return <div className="p-8 text-center text-[var(--color-text-secondary)]">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Student Profile</h2>
          <p className="text-[var(--color-text-secondary)] mt-1">Manage your academic details and goals</p>
        </div>
        <button onClick={handleLogout} className="sp-btn bg-[var(--color-danger)]/10 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/20 font-semibold px-4 py-2 border-none">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Basic Information Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="sp-card-elevated p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand)]/5 rounded-bl-full pointer-events-none" />
          
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-[var(--color-brand)]" />
            Personal Details
          </h3>

          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="relative group shrink-0">
              <div className="w-28 h-28 rounded-full bg-[var(--color-surface-secondary)] flex items-center justify-center overflow-hidden border-4 border-[var(--color-surface)] shadow-md">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-[var(--color-text-tertiary)]" />
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-[var(--color-brand)] text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-transform hover:scale-105"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            </div>
            
            <div className="flex-1 space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="sp-label">Full Name</label>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="sp-input" placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="sp-label">Email (from Google)</label>
                  <input type="email" value={email} readOnly className="sp-input opacity-70 cursor-not-allowed bg-[var(--color-surface-secondary)]" />
                </div>
              </div>
              <div>
                <label className="sp-label">Short Bio / Motivation</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="sp-input p-3 h-auto" placeholder="What drives you to study abroad?" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Academic Background Card */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="sp-card-elevated p-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full pointer-events-none" />
             <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-500" />
              Academic Background
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="sp-label">Current Education Level</label>
                <select value={currentDegree} onChange={(e) => setCurrentDegree(e.target.value)} className="sp-input">
                  <option value="High School">High School (HSC/A-Levels)</option>
                  <option value="Bachelors">Bachelors Degree</option>
                  <option value="Masters">Masters Degree</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="sp-label flex items-center gap-1.5"><FileText className="w-3.5 h-3.5"/> CGPA</label>
                  <input type="number" step="0.01" value={cgpa} onChange={(e) => setCgpa(e.target.value)} className="sp-input" placeholder="e.g. 3.85" />
                </div>
                <div>
                  <label className="sp-label flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5"/> IELTS / TOEFL</label>
                  <input type="number" step="0.5" value={ieltsScore} onChange={(e) => setIeltsScore(e.target.value)} className="sp-input" placeholder="e.g. 7.5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Study Abroad Goals Card */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="sp-card-elevated p-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
             <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-500" />
              Study Abroad Goals
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="sp-label">Target Destination</label>
                  <select value={targetCountry} onChange={(e) => setTargetCountry(e.target.value)} className="sp-input">
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">UK</option>
                    <option value="Germany">Germany</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
                <div>
                  <label className="sp-label">Target Degree</label>
                  <select value={targetDegree} onChange={(e) => setTargetDegree(e.target.value)} className="sp-input">
                    <option value="Bachelors">Bachelors</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="sp-label flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5"/> Yearly Budget (USD)</label>
                <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} className="sp-input" placeholder="e.g. 15000" />
              </div>
            </div>
          </motion.div>

        </div>

        <div className="pt-6 flex justify-end pb-12">
          <button
            type="submit"
            disabled={saving}
            className="sp-btn sp-btn-primary px-8 py-3 text-base shadow-lg shadow-blue-500/25 flex items-center gap-2 hover:-translate-y-0.5 transition-all"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};
