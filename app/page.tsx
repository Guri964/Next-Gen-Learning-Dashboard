import { createClient } from '@supabase/supabase-js';
import DashboardClient from '../components/DashboardClient';

export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export default async function Home() {
  // 1. Connect to Supabase using your environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="p-8 text-red-500">
        Missing Supabase environment variables. Please check your .env.local file.
      </div>
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // 2. Fetch the dynamic course data from your 'courses' table
  const { data: courses, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Database Error:", error.message);
    return (
      <div className="p-8 text-red-500 bg-neutral-900 h-screen">
        Failed to load database. {error.message}
      </div>
    );
  }

  // 3. Render the client UI, passing the fetched courses as a prop!
  return <DashboardClient initialCourses={courses as Course[]} />;
}