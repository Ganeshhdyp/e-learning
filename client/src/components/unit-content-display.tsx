import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Unit } from '@shared/schema';

interface UnitContentDisplayProps {
  unit: Unit;
  content: {
    sections: {
      title: string;
      content: string[];
      subsections?: {
        title: string;
        content: string[];
      }[];
    }[];
  };
}

export default function UnitContentDisplay({ unit, content }: UnitContentDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Unit Header */}
      <div className="bg-gradient-to-r from-primary to-primary/70 p-6 rounded-lg shadow-md text-white">
        <h1 className="text-2xl font-bold mb-2">{unit.title}</h1>
        <p className="text-white/90">{unit.description}</p>
      </div>
      
      {/* Unit Content Sections */}
      <div className="space-y-8">
        {content.sections.map((section, index) => (
          <Card key={index} className="overflow-hidden border-0 shadow-md">
            <div className="bg-neutral-50 border-b px-6 py-4">
              <h2 className="text-xl font-semibold text-primary">{section.title}</h2>
            </div>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="mb-4 text-neutral-700">{paragraph}</p>
                ))}
                
                {/* Subsections if available */}
                {section.subsections && section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex} className="mt-6">
                    <h3 className="text-lg font-medium text-neutral-800 mb-3">{subsection.title}</h3>
                    {subsection.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="mb-4 text-neutral-700">{paragraph}</p>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}