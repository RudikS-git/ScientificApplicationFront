import classNames from 'classnames';
import React from 'react'
import classes from './Mark.module.scss';

interface MarkProps {
  text?: string,
  variant?: 'blue' | 'gray' | 'lightGray' | 'red' | 'green'
}

export const Mark = ({ text, variant }: MarkProps) => {

  const currentClassName = classNames({
    [classes.root]: true,
    [variant && classes[variant]]: true
  })

  return (
    <div className={currentClassName}>
      {text}
    </div>
  )
}
