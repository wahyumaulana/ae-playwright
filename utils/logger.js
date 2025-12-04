/**
 * Logger - Simple logging utility for test execution
 */
class Logger {
  /**
   * Log info message
   * @param {string} message - Message to log
   */
  static info(message) {
    console.log(`[INFO] [${this.getTimestamp()}] ${message}`);
  }

  /**
   * Log error message
   * @param {string} message - Message to log
   * @param {Error} error - Error object
   */
  static error(message, error = null) {
    console.error(`[ERROR] [${this.getTimestamp()}] ${message}`);
    if (error) {
      console.error(error);
    }
  }

  /**
   * Log warning message
   * @param {string} message - Message to log
   */
  static warn(message) {
    console.warn(`[WARN] [${this.getTimestamp()}] ${message}`);
  }

  /**
   * Log debug message
   * @param {string} message - Message to log
   */
  static debug(message) {
    if (process.env.DEBUG === 'true') {
      console.debug(`[DEBUG] [${this.getTimestamp()}] ${message}`);
    }
  }

  /**
   * Log test step
   * @param {string} step - Test step description
   */
  static step(step) {
    console.log(`\n► [STEP] ${step}`);
  }

  /**
   * Get formatted timestamp
   * @returns {string} Formatted timestamp
   */
  static getTimestamp() {
    const now = new Date();
    return now.toISOString();
  }

  /**
   * Log test start
   * @param {string} testName - Test name
   */
  static testStart(testName) {
    console.log('\n' + '='.repeat(80));
    console.log(`TEST START: ${testName}`);
    console.log('='.repeat(80));
  }

  /**
   * Log test end
   * @param {string} testName - Test name
   * @param {string} status - Test status (PASS/FAIL)
   */
  static testEnd(testName, status) {
    console.log('\n' + '='.repeat(80));
    console.log(`TEST END: ${testName} - ${status}`);
    console.log('='.repeat(80) + '\n');
  }
}

module.exports = Logger;
