/**
 * Format currency amounts in UK style
 */
export function formatCurrency(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `£${(amount / 1_000_000_000).toFixed(1)}bn`;
  } else if (amount >= 1_000_000) {
    return `£${(amount / 1_000_000).toFixed(0)}m`;
  } else if (amount >= 1_000) {
    return `£${(amount / 1_000).toFixed(0)}k`;
  } else {
    return `£${amount.toLocaleString('en-GB')}`;
  }
}

/**
 * Format large numbers with UK-style thousand separators
 */
export function formatNumber(number: number): string {
  return number.toLocaleString('en-GB');
}

/**
 * Parse display amount back to number for calculations
 */
export function parseDisplayAmount(displayAmount: string): number {
  const cleanAmount = displayAmount.replace('£', '').toLowerCase();
  
  if (cleanAmount.includes('bn')) {
    return parseFloat(cleanAmount.replace('bn', '')) * 1_000_000_000;
  } else if (cleanAmount.includes('m')) {
    return parseFloat(cleanAmount.replace('m', '')) * 1_000_000;
  } else if (cleanAmount.includes('k')) {
    return parseFloat(cleanAmount.replace('k', '')) * 1_000;
  }
  
  return parseFloat(cleanAmount);
}