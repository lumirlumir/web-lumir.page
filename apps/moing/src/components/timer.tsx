/**
 * @fileoverview timer.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import NeonFont from '@/components/neon-font';
import useScenario from '@/hooks/use-scenario';
import useTimer from '@/hooks/use-timer';
import { cn } from '@/utils';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface Props {
  scenario: ReturnType<typeof useScenario>;
  timer: ReturnType<typeof useTimer>;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Timer({ scenario, timer }: Props) {
  const { visibility } = scenario.getSectionObj().timer;
  const { getTimer } = timer;

  return (
    <footer
      className={cn(
        'timer',
        'custom-flex-center',
        'transition',
        visibility || 'pointer-events-none opacity-0',
      )}
    >
      <NeonFont
        neonColor={getTimer().minute === 0 ? 'red' : 'white'}
        neonSize="s"
        style={{
          fontFamily: 'Audiowide',
          fontSize: '35px',
        }}
      >
        {getTimer().timer}
      </NeonFont>
    </footer>
  );
}
