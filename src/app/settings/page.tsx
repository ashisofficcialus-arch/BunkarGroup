'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppWrapper from '@/components/AppWrapper';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { currentUser } from '@/data/mockData';
import { 
  User, Shield, Bell, Lock, Palette, HelpCircle, 
  LogOut, ChevronRight, Camera, Check 
} from 'lucide-react';
import styles from './page.module.css';

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [isSaved, setIsSaved] = useState(false);

  const userData = user || currentUser;

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <AppWrapper>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Settings</h1>
        </div>

        <div className={styles.layout}>
          <nav className={styles.sidebar}>
            {sections.map((section) => (
              <button
                key={section.id}
                className={`${styles.navItem} ${activeSection === section.id ? styles.active : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <section.icon size={20} />
                <span>{section.label}</span>
                <ChevronRight size={16} className={styles.chevron} />
              </button>
            ))}
            
            <button className={styles.navItem} onClick={handleLogout}>
              <LogOut size={20} />
              <span>Log Out</span>
            </button>
          </nav>

          <div className={styles.content}>
            {activeSection === 'profile' && (
              <div className={styles.section}>
                <h2>Profile Settings</h2>
                <p className={styles.sectionDesc}>Manage your profile information</p>

                <div className={styles.coverSection}>
                  <div className={styles.coverImage}>
                    <img src={userData.coverImage} alt="Cover" />
                    <button className={styles.coverUpload}>
                      <Camera size={18} />
                      Change Cover
                    </button>
                  </div>
                  <div className={styles.avatarSection}>
                    <div className={styles.avatarWrapper}>
                      <Avatar src={userData.avatar} size="xl" />
                      <button className={styles.avatarUpload}>
                        <Camera size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Display Name</label>
                    <Input defaultValue={userData.displayName} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Username</label>
                    <Input defaultValue={userData.username} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Bio</label>
                    <textarea 
                      className={styles.textarea} 
                      defaultValue={userData.bio}
                      placeholder="Tell us about yourself"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Location</label>
                    <Input defaultValue={userData.location} placeholder="City, Country" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Website</label>
                    <Input defaultValue={userData.website} placeholder="https://" />
                  </div>
                </div>

                <div className={styles.actions}>
                  <Button onClick={handleSave}>
                    {isSaved ? <><Check size={18} /> Saved</> : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className={styles.section}>
                <h2>Security</h2>
                <p className={styles.sectionDesc}>Manage your account security</p>

                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h3>Password</h3>
                    <p>Last changed 30 days ago</p>
                  </div>
                  <Button variant="secondary" size="sm">Change</Button>
                </div>

                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h3>Two-Factor Authentication</h3>
                    <p>Add an extra layer of security</p>
                  </div>
                  <label className={styles.toggle}>
                    <input type="checkbox" />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h3>Active Sessions</h3>
                    <p>Manage your logged in devices</p>
                  </div>
                  <Button variant="secondary" size="sm">View</Button>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className={styles.section}>
                <h2>Notifications</h2>
                <p className={styles.sectionDesc}>Choose what you want to be notified about</p>

                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h3>Push Notifications</h3>
                    <p>Receive push notifications on your device</p>
                  </div>
                  <label className={styles.toggle}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h3>Email Notifications</h3>
                    <p>Receive updates via email</p>
                  </div>
                  <label className={styles.toggle}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h3>Like Notifications</h3>
                    <p>When someone likes your post</p>
                  </div>
                  <label className={styles.toggle}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h3>Comment Notifications</h3>
                    <p>When someone comments on your post</p>
                  </div>
                  <label className={styles.toggle}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h3>Follow Notifications</h3>
                    <p>When someone follows you</p>
                  </div>
                  <label className={styles.toggle}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className={styles.section}>
                <h2>Privacy</h2>
                <p className={styles.sectionDesc}>Control who can see your content</p>

                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h3>Profile Visibility</h3>
                    <p>Who can see your profile</p>
                  </div>
                  <select className={styles.select}>
                    <option>Everyone</option>
                    <option>Friends</option>
                    <option>Only Me</option>
                  </select>
                </div>

                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h3>Show Online Status</h3>
                    <p>Let others see when you're online</p>
                  </div>
                  <label className={styles.toggle}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h3>Allow Tagging</h3>
                    <p>Let others tag you in posts</p>
                  </div>
                  <label className={styles.toggle}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            )}

            {activeSection === 'appearance' && (
              <div className={styles.section}>
                <h2>Appearance</h2>
                <p className={styles.sectionDesc}>Customize how Bunkar looks</p>

                <div className={styles.themeOptions}>
                  <div className={`${styles.themeOption} ${styles.active}`}>
                    <div className={styles.themeDark}></div>
                    <span>Dark</span>
                  </div>
                  <div className={styles.themeOption}>
                    <div className={styles.themeLight}></div>
                    <span>Light</span>
                  </div>
                  <div className={styles.themeOption}>
                    <div className={styles.themeSystem}></div>
                    <span>System</span>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'help' && (
              <div className={styles.section}>
                <h2>Help & Support</h2>
                <p className={styles.sectionDesc}>Get help and contact support</p>

                <div className={styles.helpLinks}>
                  <a href="#" className={styles.helpLink}>
                    <span>Help Center</span>
                    <ChevronRight size={16} />
                  </a>
                  <a href="#" className={styles.helpLink}>
                    <span>Community Guidelines</span>
                    <ChevronRight size={16} />
                  </a>
                  <a href="#" className={styles.helpLink}>
                    <span>Contact Us</span>
                    <ChevronRight size={16} />
                  </a>
                  <a href="#" className={styles.helpLink}>
                    <span>Report a Problem</span>
                    <ChevronRight size={16} />
                  </a>
                </div>

                <div className={styles.version}>
                  <p>Bunkar Social v1.0.0</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppWrapper>
  );
}