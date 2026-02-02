import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Welcome to{' '}
            <span className="text-indigo-600">Tranquil</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            A type-safe, full-stack wellness platform designed for students. 
            Built with TypeScript for scalability, reliability, and seamless collaboration.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
            >
              Get started
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="text-indigo-600 text-2xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Type-Safe</h3>
            <p className="text-gray-600">
              Built with TypeScript to ensure code quality and prevent bugs before they happen.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="text-indigo-600 text-2xl mb-4">🚀</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Scalable</h3>
            <p className="text-gray-600">
              Designed to grow with your needs, from prototype to production.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="text-indigo-600 text-2xl mb-4">👥</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Collaborative</h3>
            <p className="text-gray-600">
              Easy for every team member to contribute without breaking existing features.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
