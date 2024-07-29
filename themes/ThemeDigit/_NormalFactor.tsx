import { FontDigital7Mono, FontIceland, FontTektur } from '@/styles/fonts';
import { nullableString } from '@/utils/nullableString';
import clsx from 'clsx';
import {
  useCallback,
  useState,
  type FunctionComponent,
  type ReactNode,
} from 'react';

export type NormalFactorProps = {
  number?: string;
  label?: ReactNode;
  unit?: ReactNode;
  total?: ReactNode;
};

const NormalFactor: FunctionComponent<NormalFactorProps> = ({
  number,
  unit,
  label,
  total,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const switchCollapsed = useCallback(() => {
    setIsCollapsed((c) => !c);
  }, []);

  return (
    <div className="flex flex-col">
      <span
        onClick={switchCollapsed}
        className={clsx(
          'ml-2 flex cursor-pointer items-center gap-2 font-sans text-2xl',
          FontIceland.className,
        )}
      >
        {label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12px"
          height="12px"
          viewBox="0 0 20 20"
          className={clsx(
            isCollapsed ? 'rotate-180' : 'rotate-0',
            'transition-all',
          )}
        >
          <path
            fill="currentColor"
            className="opacity-25"
            d="m2.5 15.25l7.5-7.5l7.5 7.5l1.5-1.5l-9-9l-9 9z"
          />
        </svg>
      </span>
      <div className={clsx('flex flex-row gap-1', isCollapsed && 'hidden')}>
        <span
          className={clsx(
            "font-regular min-w-[theme('spacing[36]')] text-end font-sans text-6xl",
            FontDigital7Mono.className,
          )}
        >
          {nullableString(number)}
        </span>
        <div className="flex flex-col">
          <span
            className={clsx(
              'font-regular mt-0.5 text-2xl font-medium',
              FontTektur.className,
            )}
          >
            {unit}
          </span>
          <span
            className={clsx(
              'font-regular text-1xl -mt-0.5 font-medium',
              FontTektur.className,
            )}
          >
            {total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NormalFactor;
