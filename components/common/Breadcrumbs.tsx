import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  // Generate a stable key for each breadcrumb item
  const generateKey = (item: BreadcrumbItem, index: number): string => {
    // Use label and href to create a unique key, fallback to index if needed
    const baseKey = `${item.label}-${item.href || 'no-href'}`;
    // Add index as fallback to handle potential duplicates
    return `${baseKey}-${index}`;
  };

  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={generateKey(item, index)} className="flex items-center">
            {index > 0 && (
              <svg
                className="h-4 w-4 text-gray-400 mx-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {item.href ? (
              <a
                href={item.href}
                className={`text-sm ${
                  item.current 
                    ? 'text-gray-700 font-medium' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.label}
              </a>
            ) : (
              <span
                className={`text-sm ${
                  item.current 
                    ? 'text-gray-700 font-medium' 
                    : 'text-gray-500'
                }`}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;