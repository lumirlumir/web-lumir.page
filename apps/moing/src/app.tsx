/**
 * @fileoverview app.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect } from 'react';

import Button from '@/components/button';
import MainButton from '@/components/main-button';
import SectionClient from '@/components/section-client';
import SectionConfig from '@/components/section-config';
import SectionServer from '@/components/section-server';
import Timer from '@/components/timer';
import Title from '@/components/title';
import {
  GoGear,
  CiMicrophoneOn,
  GrPowerReset,
  IoIosCheckmarkCircleOutline,
} from '@/components/svg';

import useScenario from '@/hooks/use-scenario';
import useConfig from '@/hooks/use-config';
import useInterview from '@/hooks/use-interview';
import useTimer from '@/hooks/use-timer';
import useScroll from '@/hooks/use-scroll';

import { cn } from '@/utils';

import './app.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function App() {
  const scenario = useScenario();
  const config = useConfig();
  const interview = useInterview();
  const timer = useTimer(interview.submit);
  const { scrollRef, scroll } = useScroll<HTMLDivElement>();

  useEffect(() => {
    const timeout = setTimeout(scroll, 2000);
    return () => clearTimeout(timeout);
  }, [scenario.getSectionObj, scroll]);

  return (
    <>
      <Button
        type="header-l"
        icon={<GoGear size="35px" />}
        scenario={scenario}
        onClick={() => {
          config.handleConfigState({ visibility: !config.configState.visibility });
        }}
      />
      <Button
        type="header-r"
        icon={<CiMicrophoneOn size="40px" />}
        hoverEffect={interview.listening}
        scenario={scenario}
        onClick={() => {
          interview.toggleListening();
        }}
      />
      <Button
        type="footer-l"
        icon={<GrPowerReset size="32px" />}
        scenario={scenario}
        onClick={() => {
          window.location.reload();
        }}
      />
      <Button
        type="footer-r"
        icon={<IoIosCheckmarkCircleOutline size="39px" />}
        scenario={scenario}
        onClick={() => {
          interview.submit();
          timer.stopTimer();
        }}
      />

      <Timer scenario={scenario} timer={timer} />

      <main className={cn('main', 'custom-flex-center', 'custom-scrollbar')}>
        <div ref={scrollRef}>
          <Title scenario={scenario} />
          <SectionServer
            scenario={scenario}
            config={config}
            interview={interview}
            timer={timer}
          />
          <SectionClient scenario={scenario} interview={interview} />
          <SectionConfig config={config} />
          <MainButton scenario={scenario} config={config} interview={interview} />
        </div>
      </main>
    </>
  );
}
