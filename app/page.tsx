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
import dbConnect from '@/lib/mongodb';
import AboutModel from '@/models/About';
import ExperienceModel from '@/models/Experience';
import EducationModel from '@/models/Education';
import SkillModel from '@/models/Skill';
import ProjectModel from '@/models/Project';
import CertificationModel from '@/models/Certification';
import AwardModel from '@/models/Award';
import EventModel from '@/models/Event';
import ContactModel from '@/models/Contact';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getAbout() {
  try {
    await dbConnect();
    const about = await AboutModel.findOne().sort({ createdAt: -1 }).lean();
    return about ? JSON.parse(JSON.stringify(about)) : null;
  } catch (error) {
    console.error('Error fetching about:', error);
    return null;
  }
}

async function getExperiences() {
  try {
    await dbConnect();
    const experiences = await ExperienceModel.find().sort({ order: 1, startDate: -1 }).lean();
    return JSON.parse(JSON.stringify(experiences));
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
}

async function getEducation() {
  try {
    await dbConnect();
    const education = await EducationModel.find().sort({ order: 1, startDate: -1 }).lean();
    return JSON.parse(JSON.stringify(education));
  } catch (error) {
    console.error('Error fetching education:', error);
    return [];
  }
}

async function getSkills() {
  try {
    await dbConnect();
    const skills = await SkillModel.find().sort({ category: 1, order: 1 }).lean();
    return JSON.parse(JSON.stringify(skills));
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

async function getProjects() {
  try {
    await dbConnect();
    const projects = await ProjectModel.find().sort({ featured: -1, order: 1 }).lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

async function getCertifications() {
  try {
    await dbConnect();
    const certifications = await CertificationModel.find().sort({ order: 1, issueDate: -1 }).lean();
    return JSON.parse(JSON.stringify(certifications));
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return [];
  }
}

async function getAwards() {
  try {
    await dbConnect();
    const awards = await AwardModel.find().sort({ order: 1, date: -1 }).lean();
    return JSON.parse(JSON.stringify(awards));
  } catch (error) {
    console.error('Error fetching awards:', error);
    return [];
  }
}

async function getEvents() {
  try {
    await dbConnect();
    const events = await EventModel.find().sort({ order: 1, date: -1 }).lean();
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

async function getContact() {
  try {
    await dbConnect();
    const contact = await ContactModel.findOne().sort({ createdAt: -1 }).lean();
    return contact ? JSON.parse(JSON.stringify(contact)) : null;
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

