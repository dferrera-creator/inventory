// ══════════════════════════════════════════
// ANALYTICS MODULE — Histórico KPI Calculations
// ══════════════════════════════════════════

/**
 * Calculate average days between consecutive records per unit
 * @param {Array} records - All records from API
 * @param {string} startDate - Filter start date (YYYY-MM-DD)
 * @param {string} endDate - Filter end date (YYYY-MM-DD)
 * @returns {Object} {average: days, count: numberOfUnits}
 */
function calculateAverageTimeBetweenRecords(records, startDate = null, endDate = null) {
  // Filter records by date if provided
  let filtered = records;
  if (startDate || endDate) {
    filtered = records.filter(r => {
      if (!r.date) return false;
      if (startDate && r.date < startDate) return false;
      if (endDate && r.date > endDate) return false;
      return true;
    });
  }

  // Group records by unitName
  const byUnit = {};
  filtered.forEach(r => {
    if (!byUnit[r.unitName]) byUnit[r.unitName] = [];
    byUnit[r.unitName].push(r);
  });

  // Calculate average time between records per unit
  let totalDays = 0;
  let unitCount = 0;

  Object.values(byUnit).forEach(unitRecords => {
    if (unitRecords.length < 2) return; // Need at least 2 records

    // Sort by date
    unitRecords.sort((a, b) => (a.date || '').localeCompare(b.date || ''));

    // Calculate time differences
    for (let i = 1; i < unitRecords.length; i++) {
      const prevDate = new Date(unitRecords[i - 1].date);
      const currDate = new Date(unitRecords[i].date);
      const daysDiff = Math.floor((currDate - prevDate) / (1000 * 60 * 60 * 24));
      if (daysDiff > 0) {
        totalDays += daysDiff;
        unitCount++;
      }
    }
  });

  const average = unitCount > 0 ? Math.round(totalDays / unitCount) : 0;
  return {
    average,
    count: Object.keys(byUnit).length,
    unitCount
  };
}

/**
 * Calculate average time between photos within inspections
 * @param {Array} records - All records from API
 * @param {string} startDate - Filter start date (YYYY-MM-DD)
 * @param {string} endDate - Filter end date (YYYY-MM-DD)
 * @returns {Object} {averageMinutes: number, averageHours: string, inspectionCount: number}
 */
function calculateAveragePhotoTime(records, startDate = null, endDate = null) {
  // Filter records by date and type
  let filtered = records.filter(r => {
    if (!r.date) return false;
    if (startDate && r.date < startDate) return false;
    if (endDate && r.date > endDate) return false;
    return true;
  });

  // For now, estimate photo time as average time between items in inspection
  // Since individual photo timestamps aren't available, use inspection record timestamp
  // and estimate based on number of photos
  let totalMinutesPerInspection = 0;
  let inspectionCount = 0;

  filtered.forEach(record => {
    if (record.type === 'inspection') {
      // Count total items/photos in this inspection
      let photoCount = 0;

      // Count photos if data is available (from app.js structure)
      if (record.itemCount && record.itemCount > 0) {
        // Estimate: ~2 minutes per photo on average (based on inspection workflow)
        photoCount = record.itemCount;
        if (photoCount > 1) {
          totalMinutesPerInspection += (photoCount * 2);
          inspectionCount++;
        }
      }
    }
  });

  const averageMinutes = inspectionCount > 0
    ? Math.round(totalMinutesPerInspection / inspectionCount)
    : 0;

  const hours = Math.floor(averageMinutes / 60);
  const mins = averageMinutes % 60;
  const averageHours = hours > 0
    ? `${hours}h ${mins}m`
    : `${mins}m`;

  return {
    averageMinutes,
    averageHours,
    inspectionCount
  };
}

/**
 * Get bedroom count for a record (simple method)
 * @param {Object} record - Single record from API
 * @returns {number} Estimated bedroom count
 */
function getBedroomCount(record) {
  // If record has rooms array, count bedroom-type rooms
  // Otherwise return 0 (unknown)
  // This is a simple approach - can be enhanced with data inspection
  return 0; // Placeholder - to be populated from actual record data
}

/**
 * Filter records by bedroom count
 * @param {Array} records - All records
 * @param {number|null} bedroomCount - Bedroom count to filter by (null = no filter)
 * @returns {Array} Filtered records
 */
function filterByBedroom(records, bedroomCount) {
  if (bedroomCount === null || bedroomCount === undefined) {
    return records;
  }
  return records.filter(r => getBedroomCount(r) === bedroomCount);
}

/**
 * Calculate period-over-period comparison
 * @param {number} currentValue - Current period metric value
 * @param {number} previousValue - Previous period metric value
 * @returns {Object} {percentChange: number, arrow: string, isPositive: boolean}
 */
function calculatePeriodComparison(currentValue, previousValue) {
  if (previousValue === 0) {
    return {
      percentChange: 0,
      arrow: '→',
      isPositive: false,
      isNew: true
    };
  }

  const change = ((currentValue - previousValue) / previousValue) * 100;
  const rounded = Math.round(change * 10) / 10;

  return {
    percentChange: Math.abs(rounded),
    arrow: rounded > 0 ? '↑' : rounded < 0 ? '↓' : '→',
    isPositive: rounded > 0,
    isNew: false
  };
}

/**
 * Generate time-series data for charting
 * @param {Array} records - All records
 * @param {string} metric - 'records' or 'photos'
 * @param {string} startDate - Period start
 * @param {string} endDate - Period end
 * @param {string} prevStartDate - Previous period start
 * @param {string} prevEndDate - Previous period end
 * @returns {Object} {labels, currentData, previousData}
 */
function generateTimeSeriesData(records, metric, startDate, endDate, prevStartDate, prevEndDate) {
  const labels = [];
  const currentData = [];
  const previousData = [];

  // Generate daily labels between dates
  const start = new Date(startDate);
  const end = new Date(endDate);
  const prevStart = new Date(prevStartDate);
  const prevEnd = new Date(prevEndDate);

  // Create date array for current period
  const current = new Date(start);
  while (current <= end) {
    labels.push(current.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }));

    // Count records on this day
    const dateStr = current.toISOString().split('T')[0];
    const dayRecords = records.filter(r => r.date === dateStr);

    if (metric === 'records') {
      currentData.push(dayRecords.length);
    } else if (metric === 'photos') {
      const totalPhotos = dayRecords.reduce((sum, r) => sum + (r.itemCount || 0), 0);
      currentData.push(totalPhotos);
    }

    current.setDate(current.getDate() + 1);
  }

  // Create previous period data
  const prev = new Date(prevStart);
  let prevIdx = 0;
  while (prev <= prevEnd) {
    const dateStr = prev.toISOString().split('T')[0];
    const dayRecords = records.filter(r => r.date === dateStr);

    if (metric === 'records') {
      previousData.push(dayRecords.length);
    } else if (metric === 'photos') {
      const totalPhotos = dayRecords.reduce((sum, r) => sum + (r.itemCount || 0), 0);
      previousData.push(totalPhotos);
    }

    prev.setDate(prev.getDate() + 1);
    prevIdx++;
  }

  return {
    labels,
    currentData,
    previousData,
    periodLabel: `${startDate} to ${endDate}`,
    prevPeriodLabel: `${prevStartDate} to ${prevEndDate}`
  };
}

/**
 * Format a date object to YYYY-MM-DD string
 * @param {Date} date - Date to format
 * @returns {string} Formatted date
 */
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

/**
 * Get previous period dates (subtract same number of days)
 * @param {string} startDate - Current period start (YYYY-MM-DD)
 * @param {string} endDate - Current period end (YYYY-MM-DD)
 * @returns {Object} {prevStart, prevEnd}
 */
function getPreviousPeriod(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  const prevEnd = new Date(start);
  prevEnd.setDate(prevEnd.getDate() - 1);

  const prevStart = new Date(prevEnd);
  prevStart.setDate(prevStart.getDate() - daysDiff);

  return {
    prevStart: formatDate(prevStart),
    prevEnd: formatDate(prevEnd)
  };
}
