import React from 'react';
import { PortableTextProps, applyMarksToText } from '../PortableText/PortableText';

// Your existing component definitions...

export const PortableBlogText: React.FC<PortableTextProps> = ({ content }) => {
    return (
        <div className="blog-content text-black dark:text-white">
          {content?.map((block, index) => {
            if (block?._type === 'block') {
              return (
                <p key={index} className="blog-paragraph my-4">
                  {block?.children?.map((child, childIndex) => {
                    if (typeof child === 'string') {
                      return <span className="blog-text" key={childIndex}>{child}</span>; // Plain text
                    } else {
                      return applyMarksToText(child);
                    }
                  })}
                </p>
              );
            }
            return null;
          })}
        </div>
      );
    };

export default PortableBlogText