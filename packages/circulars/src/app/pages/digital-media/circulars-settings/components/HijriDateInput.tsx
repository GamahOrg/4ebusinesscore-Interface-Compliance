import React, { useState, useEffect, forwardRef, useRef } from "react";

// Function to convert Gregorian date to Hijri
const gregorianToHijri = (gregorianDate = new Date()) => {
  // Hijri epoch: July 16, 622 CE (Gregorian)
  const hijriEpoch = new Date(622, 6, 16);

  // Calculate days since Hijri epoch
  const daysSinceEpoch = Math.floor(
    (gregorianDate - hijriEpoch) / (1000 * 60 * 60 * 24)
  );

  // Average Hijri year is about 354.367 days
  const hijriYear = Math.floor(daysSinceEpoch / 354.367) + 1;

  // Calculate remaining days in the current Hijri year
  const daysInCurrentYear =
    daysSinceEpoch - Math.floor((hijriYear - 1) * 354.367);

  // Hijri month lengths (alternating 30 and 29 days, with 12th month having 30 in leap years)
  const monthLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];

  // Adjust for leap year (adds 1 day to last month)
  const isLeapYear = (hijriYear * 11 + 14) % 30 < 11;
  if (isLeapYear) {
    monthLengths[11] = 30;
  }

  let hijriMonth = 0;
  let remainingDays = daysInCurrentYear;

  // Find the current month
  for (let i = 0; i < 12; i++) {
    if (remainingDays <= monthLengths[i]) {
      hijriMonth = i;
      break;
    }
    remainingDays -= monthLengths[i];
  }

  // Day of month (1-based)
  const hijriDay = Math.max(1, Math.ceil(remainingDays));

  return {
    day: hijriDay,
    month: hijriMonth, // 0-indexed
    year: hijriYear,
  };
};

// Function to get current Hijri date
const getCurrentHijriDate = () => {
  return gregorianToHijri(new Date());
};

const HijriDateInput = forwardRef(
  (
    {
      name,
      value,
      onChange,
      onBlur,
      placeholder = "dd/mm/yyyy",
      disabled = false,
      error,
      label,
      required = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const currentHijri = getCurrentHijriDate();

    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(currentHijri.month);
    const [currentYear, setCurrentYear] = useState(currentHijri.year);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const containerRef = useRef(null);

    const hijriMonths = [
      "محرم",
      "صفر",
      "ربيع الأول",
      "ربيع الثاني",
      "جمادى الأولى",
      "جمادى الثانية",
      "رجب",
      "شعبان",
      "رمضان",
      "شوال",
      "ذو القعدة",
      "ذو الحجة",
    ];

    const hijriMonthsEn = [
      "Muharram",
      "Safar",
      "Rabi' al-awwal",
      "Rabi' al-thani",
      "Jumada al-awwal",
      "Jumada al-thani",
      "Rajab",
      "Sha'ban",
      "Ramadan",
      "Shawwal",
      "Dhu al-Qi'dah",
      "Dhu al-Hijjah",
    ];

    const monthLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];

    // Initialize from value prop
    useEffect(() => {
      if (value) {
        const parts = value.split("-");
        if (parts.length === 3) {
          const [year, month, day] = parts.map(Number);
          setSelectedDate({ day, month: month - 1, year });
          setCurrentMonth(month - 1);
          setCurrentYear(year);
          setInputValue(
            `${String(day).padStart(2, "0")}/${String(month).padStart(
              2,
              "0"
            )}/${year}`
          );
        }
      } else {
        setInputValue("");
      }
    }, [value]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    const getDaysInMonth = (month, year) => {
      return monthLengths[month];
    };

    const getFirstDayOfMonth = (month, year) => {
      // Simple calculation for first day of week
      const totalDays = (year - 1) * 354 + month * 29.5;
      return Math.floor(totalDays) % 7;
    };

    const generateCalendarDays = () => {
      const daysInMonth = getDaysInMonth(currentMonth, currentYear);
      const firstDayOfWeek = getFirstDayOfMonth(currentMonth, currentYear);
      const days = [];

      // Previous month's trailing days
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear);

      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        days.push({
          day: daysInPrevMonth - i,
          isCurrentMonth: false,
          isPrevMonth: true,
          month: prevMonth,
          year: prevYear,
        });
      }

      // Current month days
      for (let day = 1; day <= daysInMonth; day++) {
        days.push({
          day,
          isCurrentMonth: true,
          isPrevMonth: false,
          month: currentMonth,
          year: currentYear,
        });
      }

      // Next month's leading days
      const remainingCells = 42 - days.length; // 6 rows * 7 days
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

      for (let day = 1; day <= remainingCells; day++) {
        days.push({
          day,
          isCurrentMonth: false,
          isPrevMonth: false,
          month: nextMonth,
          year: nextYear,
        });
      }

      return days;
    };

    const handleDateClick = (dateObj) => {
      if (!disabled) {
        const newDate = {
          day: dateObj.day,
          month: dateObj.month,
          year: dateObj.year,
        };
        setSelectedDate(newDate);
        setIsOpen(false);

        // Update current month/year if clicking on different month
        if (!dateObj.isCurrentMonth) {
          setCurrentMonth(dateObj.month);
          setCurrentYear(dateObj.year);
        }

        // Format as YYYY-MM-DD for form compatibility
        const formattedValue = `${dateObj.year}-${String(
          dateObj.month + 1
        ).padStart(2, "0")}-${String(dateObj.day).padStart(2, "0")}`;
        const displayValue = `${String(dateObj.day).padStart(2, "0")}/${String(
          dateObj.month + 1
        ).padStart(2, "0")}/${dateObj.year}`;

        setInputValue(displayValue);

        if (onChange) {
          onChange(formattedValue);
        }
      }
    };

    const handlePrevMonth = () => {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    };

    const handleNextMonth = () => {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    };

    const handleInputClick = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    const handleClear = () => {
      setSelectedDate(null);
      setInputValue("");
      setIsOpen(false);
      if (onChange) {
        onChange("");
      }
    };

    const handleToday = () => {
      const today = getCurrentHijriDate();
      setSelectedDate(today);
      setCurrentMonth(today.month);
      setCurrentYear(today.year);
      setInputValue(
        `${String(today.day).padStart(2, "0")}/${String(
          today.month + 1
        ).padStart(2, "0")}/${today.year}`
      );
      setIsOpen(false);

      const formattedValue = `${today.year}-${String(today.month + 1).padStart(
        2,
        "0"
      )}-${String(today.day).padStart(2, "0")}`;
      if (onChange) {
        onChange(formattedValue);
      }
    };

    const calendarDays = generateCalendarDays();
    const todayHijri = getCurrentHijriDate();

    const styles = `
    .hijri-date-input-wrapper {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      position: relative;
      width: 100%;
    }

    .hijri-date-input-label {
      display: block;
      margin-bottom: 6px;
      font-weight: 500;
      color: #374151;
      font-size: 14px;
    }

    .hijri-date-input-label.required::after {
      content: ' *';
      color: #ef4444;
    }

    .hijri-input-container {
      position: relative;
      display: inline-block;
      width: 100%;
    }

    .hijri-input {
      width: 100%;
      padding: 8px 32px 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 14px;
      font-family: inherit;
      background: white;
      cursor: pointer;
      outline: none;
      box-sizing: border-box;
    }

    .hijri-input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 1px #3b82f6;
    }

    .hijri-input.disabled {
      background: #f9fafb;
      cursor: not-allowed;
      color: #9ca3af;
    }

    .hijri-input.error {
      border-color: #ef4444;
    }

    .hijri-input::placeholder {
      color: #9ca3af;
    }

    .hijri-calendar-icon {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      color: #6b7280;
      font-size: 16px;
      pointer-events: none;
    }

    .hijri-calendar-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      margin-top: 4px;
      min-width: 280px;
    }

    .hijri-calendar-header {
      padding: 12px 16px;
      background: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .hijri-month-year {
      font-weight: 600;
      font-size: 14px;
      color: #495057;
      flex: 1;
      text-align: center;
    }

    .hijri-nav-button {
      background: none;
      border: none;
      padding: 4px 8px;
      cursor: pointer;
      border-radius: 4px;
      color: #6c757d;
      font-size: 16px;
    }

    .hijri-nav-button:hover {
      background: #e9ecef;
      color: #495057;
    }

    .hijri-calendar-grid {
      padding: 8px;
    }

    .hijri-weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
      margin-bottom: 4px;
    }

    .hijri-weekday {
      padding: 8px 4px;
      text-align: center;
      font-size: 12px;
      font-weight: 600;
      color: #6c757d;
    }

    .hijri-days-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
    }

    .hijri-day-cell {
      padding: 8px 4px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      font-size: 13px;
      min-height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.1s ease;
    }

    .hijri-day-cell:hover {
      background: #e3f2fd;
    }

    .hijri-day-cell.current-month {
      color: #212529;
    }

    .hijri-day-cell.other-month {
      color: #adb5bd;
    }

    .hijri-day-cell.selected {
      background: #007bff;
      color: white;
      font-weight: 600;
    }

    .hijri-day-cell.today {
      background: #007bff;
      color: white;
      font-weight: 600;
    }

    .hijri-calendar-footer {
      padding: 8px 12px;
      border-top: 1px solid #e9ecef;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .hijri-footer-button {
      background: none;
      border: none;
      color: #007bff;
      cursor: pointer;
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .hijri-footer-button:hover {
      background: #e3f2fd;
    }

    .hijri-error-message {
      margin-top: 4px;
      font-size: 12px;
      color: #ef4444;
    }

    /* FontAwesome CDN */
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
  `;

    return (
      <div
        className={`hijri-date-input-wrapper ${className}`}
        ref={containerRef}
      >
        <style>{styles}</style>

        {label && (
          <label
            className={`hijri-date-input-label ${required ? "required" : ""}`}
          >
            {label}
          </label>
        )}

        <div className="hijri-input-container">
          <input
            ref={ref}
            type="text"
            className={`hijri-input ${disabled ? "disabled" : ""} ${
              error ? "error" : ""
            }`}
            value={inputValue}
            placeholder={placeholder}
            onClick={handleInputClick}
            onChange={() => {}} // Controlled by calendar selection
            disabled={disabled}
            readOnly
            {...props}
          />
          <i className="fas fa-calendar-alt hijri-calendar-icon"></i>

          {isOpen && !disabled && (
            <div className="hijri-calendar-dropdown">
              <div className="hijri-calendar-header">
                <button
                  className="hijri-nav-button"
                  onClick={handlePrevMonth}
                  type="button"
                >
                  <i className="fas fa-chevron-up"></i>
                </button>
                <div className="hijri-month-year">
                  {hijriMonthsEn[currentMonth]} {currentYear}
                </div>
                <button
                  className="hijri-nav-button"
                  onClick={handleNextMonth}
                  type="button"
                >
                  <i className="fas fa-chevron-down"></i>
                </button>
              </div>

              <div className="hijri-calendar-grid">
                <div className="hijri-weekdays">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                    (day, index) => (
                      <div key={index} className="hijri-weekday">
                        {day}
                      </div>
                    )
                  )}
                </div>

                <div className="hijri-days-grid">
                  {calendarDays.map((dateObj, index) => (
                    <div
                      key={index}
                      className={`hijri-day-cell ${
                        dateObj.isCurrentMonth ? "current-month" : "other-month"
                      } ${
                        selectedDate &&
                        selectedDate.day === dateObj.day &&
                        selectedDate.month === dateObj.month &&
                        selectedDate.year === dateObj.year
                          ? "selected"
                          : ""
                      } ${
                        dateObj.day === todayHijri.day &&
                        dateObj.month === todayHijri.month &&
                        dateObj.year === todayHijri.year
                          ? "today"
                          : ""
                      }`}
                      onClick={() => handleDateClick(dateObj)}
                    >
                      {dateObj.day}
                    </div>
                  ))}
                </div>
              </div>

              <div className="hijri-calendar-footer">
                <button
                  className="hijri-footer-button"
                  onClick={handleClear}
                  type="button"
                >
                  Clear
                </button>
                <button
                  className="hijri-footer-button"
                  onClick={handleToday}
                  type="button"
                >
                  Today
                </button>
              </div>
            </div>
          )}
        </div>

        {error && <div className="hijri-error-message">{error}</div>}
      </div>
    );
  }
);

HijriDateInput.displayName = "HijriDateInput";

export default HijriDateInput;
