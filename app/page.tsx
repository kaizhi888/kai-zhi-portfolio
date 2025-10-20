import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Awards from '@/components/Awards';
import Events from '@/components/Events';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

async function getAbout() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/about`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching about:', error);
    return null;
  }
}

async function getExperiences() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/experience`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
}

async function getEducation() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/education`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching education:', error);
    return [];
  }
}

async function getSkills() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/skills`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

async function getProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/projects`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

async function getCertifications() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/certifications`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return [];
  }
}

async function getAwards() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/awards`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching awards:', error);
    return [];
  }
}

async function getEvents() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/events`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

async function getContact() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/contact`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching contact:', error);
    return null;
  }
}

export default async function Home() {
  const [about, experiences, education, skills, projects, certifications, awards, events, contact] = await Promise.all([
    getAbout(),
    getExperiences(),
    getEducation(),
    getSkills(),
    getProjects(),
    getCertifications(),
    getAwards(),
    getEvents(),
    getContact(),
  ]);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero about={about} />
      <About about={about} />
      {experiences.length > 0 && <Experience experiences={experiences} />}
      {education.length > 0 && <Education education={education} />}
      {skills.length > 0 && <Skills skills={skills} />}
      {projects.length > 0 && <Projects projects={projects} />}
      {certifications.length > 0 && <Certifications certifications={certifications} />}
      {awards.length > 0 && <Awards awards={awards} />}
      {events.length > 0 && <Events events={events} />}
      <Contact contact={contact} />
      <Footer contact={contact} />
    </main>
  );
}

