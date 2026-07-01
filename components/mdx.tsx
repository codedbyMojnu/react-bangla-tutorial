import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import AudioPlayer from './AudioPlayer';
import CollaborateSection from './CollaborateSection';
import CoursePromotion from './CoursePromotion';
import PdfDownloader from './PdfDownloader';
import Pitfall from './Pitfall';
import Reveal from './Reveal';
import Showcase from './Showcase';
import VideoPlayer from './VideoPlayer';

const GiscusComments = dynamic(() => import('./GiscusComments')) as ComponentType<any>;
const LiveCodeEditor = dynamic(() => import('./LiveCodeEditor')) as ComponentType<any>;
const Donate = dynamic(() => import('./Donate')) as ComponentType<any>;

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    VideoPlayer,
    AudioPlayer,
    PdfDownloader,
    Pitfall,
    Reveal,
    LiveCodeEditor,
    Donate,
    GiscusComments,
    Showcase,
    CollaborateSection,
    CoursePromotion,
    ...components,
  } as MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
