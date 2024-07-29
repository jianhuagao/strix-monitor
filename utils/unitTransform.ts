import { keepDigit } from '@/utils/math';

export const cpuClockFunc = (scpuclk?: string) => {
  const clock = Number(scpuclk) / 1024;

  return isNaN(clock) ? undefined : String(keepDigit(clock, 2));
};

export const gpuClockFunc = (sgpu1clk?: string) => {
  const clock = Number(sgpu1clk) / 1024;

  return isNaN(clock) ? undefined : String(keepDigit(clock, 2));
};

export const gpuMemoryUsageFunc = (sgpu1useddemem?: string) => {
  const used = Number(sgpu1useddemem) / 1024;
  const usage = (Number(sgpu1useddemem) / (24 * 1024)) * 100;

  return {
    used: isNaN(used) ? undefined : String(keepDigit(used, 1)),
    usage: isNaN(usage) ? undefined : String(usage),
  };
};

export const usedMemoryFunc = (sfreemem?: string, susedmem?: string) => {
  const used = Number(susedmem);
  const free = Number(sfreemem);
  const total = (used + free) / 1024;

  return {
    total: isNaN(total) ? undefined : String(keepDigit(total, 1)),
    used: isNaN(used) ? undefined : String(keepDigit(used / 1024, 1)),
  };
};
