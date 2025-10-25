import { css } from '@/styled-system/css';
import React from 'react';

export default function page() {
  return (
    <div className={css({ fontSize: '2xl', fontWeight: 'bold', color: 'blue' })}>Hello 🐼!</div>
  );
}
