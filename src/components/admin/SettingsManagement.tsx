import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAdminSettings } from "@/hooks/useAdminSettings";
import { Settings, Save, RefreshCw } from "lucide-react";

export function SettingsManagement() {
  const { toast } = useToast();
  const { settings, loading, updateSetting } = useAdminSettings();
  const [localSettings, setLocalSettings] = useState<{[key: string]: string}>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLocalSettings(settings);
    }
  }, [settings, loading]);

  const handleSettingChange = (key: string, value: string) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(localSettings)) {
        if (settings[key] !== value) {
          await updateSetting(key, value);
        }
      }
      toast({
        title: "Settings Saved",
        description: "All changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const resetSettings = () => {
    setLocalSettings(settings);
    toast({
      title: "Settings Reset",
      description: "All changes have been reverted to saved values.",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Website Settings</h1>
          <p className="text-muted-foreground">Manage your website content and configuration</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={resetSettings} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Changes
          </Button>
          <Button onClick={saveSettings} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Hero Section Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Hero Section
          </CardTitle>
          <CardDescription>
            Configure the main hero section on your homepage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="site_title">Site Title</Label>
              <Input
                id="site_title"
                value={localSettings.site_title || ''}
                onChange={(e) => handleSettingChange('site_title', e.target.value)}
                placeholder="BRCTC - Behavioral Research & Counseling Training Center"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_title">Hero Title</Label>
              <Input
                id="hero_title"
                value={localSettings.hero_title || ''}
                onChange={(e) => handleSettingChange('hero_title', e.target.value)}
                placeholder="Professional Counseling & Training"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
            <Textarea
              id="hero_subtitle"
              rows={3}
              value={localSettings.hero_subtitle || ''}
              onChange={(e) => handleSettingChange('hero_subtitle', e.target.value)}
              placeholder="Empowering individuals and organizations through comprehensive mental health services and professional training programs."
            />
          </div>
        </CardContent>
      </Card>

      {/* About Section Settings */}
      <Card>
        <CardHeader>
          <CardTitle>About Section</CardTitle>
          <CardDescription>
            Manage your organization's mission and vision statements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vision_statement">Vision Statement</Label>
            <Textarea
              id="vision_statement"
              rows={4}
              value={localSettings.vision_statement || ''}
              onChange={(e) => handleSettingChange('vision_statement', e.target.value)}
              placeholder="To be the leading center for behavioral research and counseling training in Kenya..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mission_statement">Mission Statement</Label>
            <Textarea
              id="mission_statement"
              rows={4}
              value={localSettings.mission_statement || ''}
              onChange={(e) => handleSettingChange('mission_statement', e.target.value)}
              placeholder="Our mission is to provide comprehensive mental health services and professional training..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Update your organization's contact details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact_phone">Phone Number</Label>
              <Input
                id="contact_phone"
                value={localSettings.contact_phone || ''}
                onChange={(e) => handleSettingChange('contact_phone', e.target.value)}
                placeholder="+254 721 683232"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_email">Email Address</Label>
              <Input
                id="contact_email"
                type="email"
                value={localSettings.contact_email || ''}
                onChange={(e) => handleSettingChange('contact_email', e.target.value)}
                placeholder="info@brctc.co.ke"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_address">Physical Address</Label>
            <Input
              id="contact_address"
              value={localSettings.contact_address || ''}
              onChange={(e) => handleSettingChange('contact_address', e.target.value)}
              placeholder="Nairobi, Kenya"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="office_hours">Office Hours</Label>
            <Input
              id="office_hours"
              value={localSettings.office_hours || ''}
              onChange={(e) => handleSettingChange('office_hours', e.target.value)}
              placeholder="Monday - Friday: 8:00 AM - 6:00 PM"
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Media & Links */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media & External Links</CardTitle>
          <CardDescription>
            Configure social media profiles and external links
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="facebook_url">Facebook URL</Label>
              <Input
                id="facebook_url"
                value={localSettings.facebook_url || ''}
                onChange={(e) => handleSettingChange('facebook_url', e.target.value)}
                placeholder="https://facebook.com/brctc"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter_url">Twitter URL</Label>
              <Input
                id="twitter_url"
                value={localSettings.twitter_url || ''}
                onChange={(e) => handleSettingChange('twitter_url', e.target.value)}
                placeholder="https://twitter.com/brctc"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input
                id="linkedin_url"
                value={localSettings.linkedin_url || ''}
                onChange={(e) => handleSettingChange('linkedin_url', e.target.value)}
                placeholder="https://linkedin.com/company/brctc"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram_url">Instagram URL</Label>
              <Input
                id="instagram_url"
                value={localSettings.instagram_url || ''}
                onChange={(e) => handleSettingChange('instagram_url', e.target.value)}
                placeholder="https://instagram.com/brctc"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services Page Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Services Page Content</CardTitle>
          <CardDescription>
            Manage the services offered and their descriptions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="services_page_title">Services Page Title</Label>
            <Input
              id="services_page_title"
              value={localSettings.services_page_title || ''}
              onChange={(e) => handleSettingChange('services_page_title', e.target.value)}
              placeholder="Our Services"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="services_page_subtitle">Services Page Subtitle</Label>
            <Textarea
              id="services_page_subtitle"
              rows={2}
              value={localSettings.services_page_subtitle || ''}
              onChange={(e) => handleSettingChange('services_page_subtitle', e.target.value)}
              placeholder="Comprehensive mental health and counseling services"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="individual_therapy_description">Individual Therapy Description</Label>
            <Textarea
              id="individual_therapy_description"
              rows={4}
              value={localSettings.individual_therapy_description || ''}
              onChange={(e) => handleSettingChange('individual_therapy_description', e.target.value)}
              placeholder="One-on-one counseling sessions tailored to your specific needs..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="group_therapy_description">Group Therapy Description</Label>
            <Textarea
              id="group_therapy_description"
              rows={4}
              value={localSettings.group_therapy_description || ''}
              onChange={(e) => handleSettingChange('group_therapy_description', e.target.value)}
              placeholder="Connect with others in a supportive group environment..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="family_therapy_description">Family Therapy Description</Label>
            <Textarea
              id="family_therapy_description"
              rows={4}
              value={localSettings.family_therapy_description || ''}
              onChange={(e) => handleSettingChange('family_therapy_description', e.target.value)}
              placeholder="Strengthen family relationships and improve communication..."
            />
          </div>
        </CardContent>
      </Card>

      {/* About Page Settings */}
      <Card>
        <CardHeader>
          <CardTitle>About Page Content</CardTitle>
          <CardDescription>
            Manage the about page content and team information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="about_page_title">About Page Title</Label>
            <Input
              id="about_page_title"
              value={localSettings.about_page_title || ''}
              onChange={(e) => handleSettingChange('about_page_title', e.target.value)}
              placeholder="About BRCTC"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about_page_intro">About Page Introduction</Label>
            <Textarea
              id="about_page_intro"
              rows={4}
              value={localSettings.about_page_intro || ''}
              onChange={(e) => handleSettingChange('about_page_intro', e.target.value)}
              placeholder="Welcome to the Behavioral Research & Counseling Training Center..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="team_section_title">Team Section Title</Label>
            <Input
              id="team_section_title"
              value={localSettings.team_section_title || ''}
              onChange={(e) => handleSettingChange('team_section_title', e.target.value)}
              placeholder="Meet Our Team"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="team_description">Team Description</Label>
            <Textarea
              id="team_description"
              rows={3}
              value={localSettings.team_description || ''}
              onChange={(e) => handleSettingChange('team_description', e.target.value)}
              placeholder="Our experienced team of professionals is dedicated to..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Training Page Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Training Page Content</CardTitle>
          <CardDescription>
            Manage training programs and course descriptions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="training_page_title">Training Page Title</Label>
            <Input
              id="training_page_title"
              value={localSettings.training_page_title || ''}
              onChange={(e) => handleSettingChange('training_page_title', e.target.value)}
              placeholder="Professional Training Programs"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="training_page_subtitle">Training Page Subtitle</Label>
            <Textarea
              id="training_page_subtitle"
              rows={2}
              value={localSettings.training_page_subtitle || ''}
              onChange={(e) => handleSettingChange('training_page_subtitle', e.target.value)}
              placeholder="Advance your career with our comprehensive training programs"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="counseling_certification_description">Counseling Certification Description</Label>
            <Textarea
              id="counseling_certification_description"
              rows={4}
              value={localSettings.counseling_certification_description || ''}
              onChange={(e) => handleSettingChange('counseling_certification_description', e.target.value)}
              placeholder="Comprehensive counseling certification program covering theory and practice..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="research_methods_description">Research Methods Description</Label>
            <Textarea
              id="research_methods_description"
              rows={4}
              value={localSettings.research_methods_description || ''}
              onChange={(e) => handleSettingChange('research_methods_description', e.target.value)}
              placeholder="Learn advanced research methodologies in behavioral sciences..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clinical_supervision_description">Clinical Supervision Description</Label>
            <Textarea
              id="clinical_supervision_description"
              rows={4}
              value={localSettings.clinical_supervision_description || ''}
              onChange={(e) => handleSettingChange('clinical_supervision_description', e.target.value)}
              placeholder="Professional supervision for practicing counselors and therapists..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Emergency & Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency & Additional Information</CardTitle>
          <CardDescription>
            Configure emergency contact information and additional details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergency_contact">Emergency Contact</Label>
              <Input
                id="emergency_contact"
                value={localSettings.emergency_contact || ''}
                onChange={(e) => handleSettingChange('emergency_contact', e.target.value)}
                placeholder="+254 700 000000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registration_number">Registration Number</Label>
              <Input
                id="registration_number"
                value={localSettings.registration_number || ''}
                onChange={(e) => handleSettingChange('registration_number', e.target.value)}
                placeholder="Company/Organization Registration Number"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="about_description">About Description</Label>
            <Textarea
              id="about_description"
              rows={4}
              value={localSettings.about_description || ''}
              onChange={(e) => handleSettingChange('about_description', e.target.value)}
              placeholder="Detailed description about your organization..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="footer_text">Footer Text</Label>
            <Textarea
              id="footer_text"
              rows={2}
              value={localSettings.footer_text || ''}
              onChange={(e) => handleSettingChange('footer_text', e.target.value)}
              placeholder="Copyright text and additional footer information"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}