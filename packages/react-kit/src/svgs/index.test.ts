/**
 * @fileoverview Test for `index.tsx`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import {
  BiLogoVisualStudio,
  CiMicrophoneOn,
  FaAngleDown,
  FaAngleUp,
  FaArrowDownWideShort,
  FaArrowUpShortWide,
  FaBook,
  FaBookOpen,
  FaCode,
  FaCss3Alt,
  FaDatabase,
  FaGithub,
  FaHouseChimney,
  FaHtml5,
  FaLaptopCode,
  FaLinux,
  FaMarkdown,
  FaNodeJs,
  FaNpm,
  FaPen,
  FaReact,
  FaRegCalendarPlus,
  FaRegCalendarXmark,
  FaScrewdriverWrench,
  FaTag,
  GiHummingbird,
  GoGear,
  GrPowerReset,
  GrSort,
  HiOutlineMenuAlt2,
  IoIosCheckmarkCircleOutline,
  LmSearch,
  LuHeading1,
  LuNetwork,
  MdDataObject,
  RiJavascriptFill,
  SiCplusplus,
  SiOpenai,
  SiSynology,
  SiThealgorithms,
  TbBrandNextjs,
} from './index.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function assertSVG(component: unknown) {
  assert.isDefined(component);
  assert.strictEqual(typeof component, 'function');
}

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  describe('exports', () => {
    it('`BiLogoVisualStudio` should be defined', () => {
      assertSVG(BiLogoVisualStudio);
    });

    it('`CiMicrophoneOn` should be defined', () => {
      assertSVG(CiMicrophoneOn);
    });

    it('`FaAngleDown` should be defined', () => {
      assertSVG(FaAngleDown);
    });

    it('`FaAngleUp` should be defined', () => {
      assertSVG(FaAngleUp);
    });

    it('`FaArrowDownWideShort` should be defined', () => {
      assertSVG(FaArrowDownWideShort);
    });

    it('`FaArrowUpShortWide` should be defined', () => {
      assertSVG(FaArrowUpShortWide);
    });

    it('`FaBook` should be defined', () => {
      assertSVG(FaBook);
    });

    it('`FaBookOpen` should be defined', () => {
      assertSVG(FaBookOpen);
    });

    it('`FaCode` should be defined', () => {
      assertSVG(FaCode);
    });

    it('`FaCss3Alt` should be defined', () => {
      assertSVG(FaCss3Alt);
    });

    it('`FaDatabase` should be defined', () => {
      assertSVG(FaDatabase);
    });

    it('`FaGithub` should be defined', () => {
      assertSVG(FaGithub);
    });

    it('`FaHouseChimney` should be defined', () => {
      assertSVG(FaHouseChimney);
    });

    it('`FaHtml5` should be defined', () => {
      assertSVG(FaHtml5);
    });

    it('`FaLaptopCode` should be defined', () => {
      assertSVG(FaLaptopCode);
    });

    it('`FaLinux` should be defined', () => {
      assertSVG(FaLinux);
    });

    it('`FaMarkdown` should be defined', () => {
      assertSVG(FaMarkdown);
    });

    it('`FaNodeJs` should be defined', () => {
      assertSVG(FaNodeJs);
    });

    it('`FaNpm` should be defined', () => {
      assertSVG(FaNpm);
    });

    it('`FaPen` should be defined', () => {
      assertSVG(FaPen);
    });

    it('`FaReact` should be defined', () => {
      assertSVG(FaReact);
    });

    it('`FaRegCalendarPlus` should be defined', () => {
      assertSVG(FaRegCalendarPlus);
    });

    it('`FaRegCalendarXmark` should be defined', () => {
      assertSVG(FaRegCalendarXmark);
    });

    it('`FaScrewdriverWrench` should be defined', () => {
      assertSVG(FaScrewdriverWrench);
    });

    it('`FaTag` should be defined', () => {
      assertSVG(FaTag);
    });

    it('`GiHummingbird` should be defined', () => {
      assertSVG(GiHummingbird);
    });

    it('`GoGear` should be defined', () => {
      assertSVG(GoGear);
    });

    it('`GrPowerReset` should be defined', () => {
      assertSVG(GrPowerReset);
    });

    it('`GrSort` should be defined', () => {
      assertSVG(GrSort);
    });

    it('`HiOutlineMenuAlt2` should be defined', () => {
      assertSVG(HiOutlineMenuAlt2);
    });

    it('`IoIosCheckmarkCircleOutline` should be defined', () => {
      assertSVG(IoIosCheckmarkCircleOutline);
    });

    it('`LmSearch` should be defined', () => {
      assertSVG(LmSearch);
    });

    it('`LuHeading1` should be defined', () => {
      assertSVG(LuHeading1);
    });

    it('`LuNetwork` should be defined', () => {
      assertSVG(LuNetwork);
    });

    it('`MdDataObject` should be defined', () => {
      assertSVG(MdDataObject);
    });

    it('`RiJavascriptFill` should be defined', () => {
      assertSVG(RiJavascriptFill);
    });

    it('`SiCplusplus` should be defined', () => {
      assertSVG(SiCplusplus);
    });

    it('`SiOpenai` should be defined', () => {
      assertSVG(SiOpenai);
    });

    it('`SiSynology` should be defined', () => {
      assertSVG(SiSynology);
    });

    it('`SiThealgorithms` should be defined', () => {
      assertSVG(SiThealgorithms);
    });

    it('`TbBrandNextjs` should be defined', () => {
      assertSVG(TbBrandNextjs);
    });
  });
});
