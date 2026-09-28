import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { User, Camera, Save, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const UserProfileTab: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState<string | null>(null);
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
        if (data.fullName) setFullName(data.fullName);
        if (data.bio) setBio(data.bio);
        if (data.profilePicBase64) setProfilePic(data.profilePicBase64);
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
        body: JSON.stringify({ fullName, bio, profilePicBase64: profilePic })
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
    navigate('/login');
  };

  if (loading) return <div className="p-8 text-center text-[var(--color-text-secondary)]">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="sp-card-elevated p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Your Profile</h2>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center sm:flex-row gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-[var(--color-surface-secondary)] flex items-center justify-center overflow-hidden border border-[var(--color-border)]">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-[var(--color-text-tertiary)]" />
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[var(--color-brand)] text-white flex items-center justify-center shadow-sm hover:bg-blue-600 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)]">Profile Picture</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">Upload a recent photo to personalize your account.</p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg h-11 px-4 focus:ring-[#0066FF] focus:border-[#0066FF] sm:text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Short Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg p-4 focus:ring-[#0066FF] focus:border-[#0066FF] sm:text-sm"
                placeholder="Aspiring CS student looking to study in Germany..."
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="sp-btn sp-btn-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
