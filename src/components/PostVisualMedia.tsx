import { Play } from '@/svg_components';
import { VisualMediaType } from '@prisma/client';

export default function PostVisualMedia({
  type,
  url,
  onClick,
}: {
  type: VisualMediaType;
  url: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className="w-1/2 max-h-[400px] cursor-pointer overflow-hidden relative group"
      onClick={onClick}
    >
      {type === 'PHOTO' ? (
        <img
          src={url}
          className="object-cover w-full h-full transition-transform hover:scale-110"
        />
      ) : (
        <>
          <Play
            width={48}
            height={48}
            className="stroke-violet-100 absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] transition-transform group-hover:scale-125"
          />
          <video className="object-cover w-full h-full">
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </>
      )}
    </div>
  );
}