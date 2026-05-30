🚀 Next-Gen Learning Dashboard

A futuristic, high-fidelity learning dashboard prototype built for the "Next-Gen" frontend challenge. It features a fully responsive Bento Grid architecture, deep dark-mode aesthetics, and buttery-smooth, hardware-accelerated animations powered by efficient, server-rendered data.

🏗 Architectural Choices & Component Split

To strictly adhere to the App Router paradigm and maximize performance, this application heavily utilizes the React Server Components (RSC) architecture.

1. Server-Side Data Fetching (app/page.tsx)

Data fetching logic is intentionally isolated to Server Components. Using @supabase/supabase-js, the application connects to the PostgreSQL database securely on the server. This prevents shipping the Supabase client bundle to the browser, protects environment variables, and ensures the data is ready before the page even reaches the client.

2. Interactive UI (components/DashboardClient.tsx)

The DashboardClient is marked with "use client". It receives the pre-fetched course data as a strongly-typed prop (initialCourses). By separating this, the component focuses entirely on orchestrating the Framer Motion animations, interactive hover states, and the layoutId sidebar micro-interactions without mixing server logic.

3. Loading States (app/loading.tsx)

I utilized Next.js's native <Suspense> boundaries via loading.tsx. This instantly renders a hardware-accelerated, pulsing skeleton UI matching the exact dimensions of the Bento grid while the database query resolves on the server.

⚡ Performance & Animation Constraints

Zero Layout Shifts: All interactive hover states and staggered entrance animations strictly utilize GPU-accelerated CSS properties (transform: scale and opacity). Hover states rely on box-shadow and pseudo-element opacity fades rather than margins or borders to prevent browser repaints.

Spring Physics: Framer Motion is configured with custom spring physics (stiffness: 300, damping: 20) globally. This ensures entrance animations and UI interactions feel natural, snappy, and non-linear.

Semantic HTML (No "Div Soup"): The DOM tree is constructed logically using <main>, <aside>, <nav>, <section>, and <article> tags to ensure accessibility and clean markup.

🧗 Challenges Faced

Hydration Mismatches with Dynamic UI: The ActivityTile features a mock contribution graph utilizing Math.random(). Initially, this caused React Hydration errors because the server-rendered HTML did not match the client-rendered output. I resolved this by initializing a blank grid during SSR and utilizing a useEffect hook to dynamically populate the randomized blocks only after the component safely mounted on the client.

Tailwind v4 PostCSS Integration: Configuring the brand new Tailwind CSS v4 required moving away from the traditional PostCSS plugin structure to the new @tailwindcss/postcss package and updating the globals.css import syntax to ensure the dark-mode theme compiled properly locally.

Framer Motion Strict Typing: During the production build phase, Next.js caught a strict type error regarding Framer Motion's Transition configuration. TypeScript inferred the generic object property type: "spring" as a standard string rather than the specific literal expected by the library. I resolved this by applying an as const assertion to the object to guarantee strict type compliance for the animation generator.

🚀 How to Run Locally

Prerequisites

Node.js 18.x or higher

A free Supabase account.

1. Database Setup

Navigate to the SQL Editor in your Supabase dashboard.

Paste and run the contents of the schema.sql file provided in this repository to create the courses table, setup Row Level Security (RLS), and insert the seed data.

2. Local Installation

Clone the repository:

git clone <your-repo-url>
cd <your-repo-directory>



Install dependencies:

npm install



Configure Environment Variables:

Copy the example environment file:

cp .env.example .env.local



Open .env.local and add your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (found in your Supabase Project Settings -> API).

Start the development server:

npm run dev



View the application: Open http://localhost:3000.