import Link from 'next/link';

interface Collaborator {
  name: string;
  role?: string;
}

const collaborators: Collaborator[] = [
  { name: 'Eileen Lojano', role: 'Developer' },
  { name: 'Faraibe Khan', role: 'Developer' },
  { name: 'Nuzhat Khan', role: 'Developer' },
  { name: 'Sagor S. Dhor', role: 'Developer' },
  { name: 'Madiha (What is Your last name?)', role: 'Developer' },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700">
              Tranquil
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              A type-safe, full-stack wellness platform for students.
            </p>
          </div>

          {/* Collaborators Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Our Team
            </h3>
            <ul className="space-y-2">
              {collaborators.map((collaborator, index) => (
                <li key={index} className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">{collaborator.name}</span>
                  {collaborator.role && (
                    <span className="text-gray-500 ml-2">• {collaborator.role}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Tranquil. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
