/* eslint-disable react/prop-types */

import styles from "./Icon.module.css";

const Icon = ({ children, className,width = "50", height = "50", viewBox = "0 0 28 28", ...props }) => {
  return (
    <div className={`${styles.iconWrapper} ${className || ""}`}>
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.iconBorder}
        {...props}
      >
        <g className={styles.iconPaths}>{children}</g>
      </svg>
    </div>
  );
};

export default Icon;
