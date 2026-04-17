/**
 * @fileoverview title.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import NeonFont from '@/components/neon-font';
import useScenario from '@/hooks/use-scenario';
import { cn } from '@/utils';

import './title.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface Props {
  scenario: ReturnType<typeof useScenario>;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Title({ scenario }: Props) {
  const { visibility } = scenario.getSectionObj().title;

  return (
    <div
      className={cn(
        'title',
        'transition',
        'select-none',
        'custom-main-others',
        visibility || 'pointer-events-none opacity-0',
      )}
    >
      <div className="mock">
        <NeonFont
          neonColor="blue"
          neonSize="m"
          style={{ fontFamily: 'Pacifico', fontSize: '50px' }}
        >
          <h1>Mock</h1>
        </NeonFont>
      </div>
      <div className="interview">
        <NeonFont
          neonColor="purple"
          style={{ fontFamily: 'Audiowide', fontSize: '100px' }}
        >
          <h1>Interview</h1>
        </NeonFont>
      </div>
    </div>
  );
}
