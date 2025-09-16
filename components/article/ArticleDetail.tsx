'use client';

import { Code } from '../Util/Code';
import { Textz } from '../Util/Tezt';

export const ArticleDetail = () => {
  const code = `🐤`;

  return (
    <div>
      <Textz
        bold
        text={'Articles > ' + 'A slightly belated 2024 retrospective'}
        className='mb-[10px]'
      />
      <Code code={code} />
    </div>
  );
};
