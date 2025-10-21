'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AboutPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [useResumeUrl, setUseResumeUrl] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
    profileImage: '',
    resumeFile: '',
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await fetch('/api/about');
      const data = await res.json();
      if (data._id) {
        setFormData({
          name: data.name || '',
          tagline: data.tagline || '',
          description: data.description || '',
          profileImage: data.profileImage || '',
          resumeFile: data.resumeUrl || '',
        });
      }
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('About section updated successfully!');
        fetchAbout();
      } else {
        toast.error('Failed to update');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center"><div className="spinner"></div></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Section</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., Cybersecurity Enthusiast | Blockchain Advocate"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Tell visitors about yourself..."
          />
        </div>

        <ImageUpload
          label="Profile Image"
          currentImage={formData.profileImage}
          onImageChange={(image) => setFormData({ ...formData, profileImage: image || '' })}
        />

        {/* Resume Section with Toggle */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Resume (PDF)</label>
          
          {/* Toggle between URL and File Upload */}
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => setUseResumeUrl(true)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                useResumeUrl
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📎 Use URL Link
            </button>
            <button
              type="button"
              onClick={() => setUseResumeUrl(false)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !useResumeUrl
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📁 Upload File
            </button>
          </div>

          {useResumeUrl ? (
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Paste Google Drive or any direct download link:
              </label>
              <input
                type="url"
                value={formData.resumeFile}
                onChange={(e) => setFormData({ ...formData, resumeFile: e.target.value })}
                placeholder="https://drive.google.com/uc?export=download&id=YOUR_FILE_ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="mt-2 text-xs text-gray-500">
                💡 For Google Drive: Share your PDF → Copy link → Convert to direct download format:
                <br />
                <code className="bg-gray-100 px-2 py-1 rounded">
                  https://drive.google.com/uc?export=download&id=YOUR_FILE_ID
                </code>
              </p>
            </div>
          ) : (
            <ImageUpload
              label=""
              currentImage={formData.resumeFile}
              onImageChange={(file) => setFormData({ ...formData, resumeFile: file || '' })}
              accept="application/pdf,.pdf"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

