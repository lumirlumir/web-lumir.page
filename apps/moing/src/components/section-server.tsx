/**
 * @fileoverview section-server.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useLayoutEffect, useMemo } from 'react';

import NeonDiv from '@/components/neon-div';
import Typewriter from '@/components/typewriter';
import useScenario from '@/hooks/use-scenario';
import useConfig from '@/hooks/use-config';
import useInterview from '@/hooks/use-interview';
import useTimer from '@/hooks/use-timer';
import useScroll from '@/hooks/use-scroll';
import useHistoryState from '@/hooks/use-history-state';
import { cn } from '@/utils';

import './section-server.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface Props {
  scenario: ReturnType<typeof useScenario>;
  config: ReturnType<typeof useConfig>;
  interview: ReturnType<typeof useInterview>;
  timer: ReturnType<typeof useTimer>;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function SectionServer({ scenario, config, interview, timer }: Props) {
  const { getSectionObj, toNextSection } = scenario;
  const { visibility, content, mode } = getSectionObj()['section-server'];
  const { configState } = config;
  const { getInterviewInfo, getQuestion, isInterviewDone, getInterviewHistory } =
    interview;
  const { resetTimer } = timer;
  const { scrollRef, scroll } = useScroll<HTMLDivElement>();
  const { historyState, addHistory } = useHistoryState<string>();

  const text = useMemo(() => {
    if (mode === 'test')
      return getQuestion() === null
        ? ''
        : `> ${getInterviewInfo().questionType.toUpperCase()}분야 ${getInterviewInfo().questionMain}-${getInterviewInfo().questionSub}번 문제입니다. ${getQuestion()}\n\n`;

    if (mode === 'result') return getInterviewHistory();

    return content;
  }, [mode, content, getInterviewInfo, getQuestion, getInterviewHistory]);

  useLayoutEffect(() => {
    addHistory(text);
  }, [text, addHistory]);

  useEffect(() => {
    if (mode === 'test' && isInterviewDone()) toNextSection();
  }, [getQuestion, isInterviewDone, toNextSection, mode]);

  return (
    <NeonDiv
      className={cn(
        'section-server',
        'custom-scrollbar',
        'custom-main-section',
        'custom-main-section-bash',
        'transition',
        visibility && !configState.visibility ? '' : 'custom-invisible-section',
        mode === 'result' && 'wide',
      )}
      neonColor="black"
    >
      <div>{historyState.slice(0, -1)}</div>
      <div>
        <Typewriter
          key={text}
          text={text}
          cursor="_"
          writeSpeed={mode === 'result' ? 1 : 25} // original: 30
          writePreDelay={2000}
          writePostDelay={1000}
          onWriteComplete={() => {
            if (mode === 'auto' || mode === 'result') toNextSection();
            if (mode === 'test' && text !== '') resetTimer(configState.time);
            scroll();
          }}
        />
      </div>
      <div className="ref" ref={scrollRef} />
    </NeonDiv>
  );
}
