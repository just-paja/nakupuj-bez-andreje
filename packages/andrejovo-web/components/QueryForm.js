import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import styles from './QueryForm.module.scss'

export function QueryForm () {
  return (
    <Form className={styles.queryForm} action='search' method='get'>
      <h1>Je to Andrejovo?</h1>
      <fieldset>
        <Form.Group controlId='q'>
          <Form.Control
            name='q'
            type='text'
            placeholder='Např. Penam toustový chléb'
          />
        </Form.Group>
      </fieldset>
      <div className='form-buttons'>
        <Button type='submit' size='lg'>
          Hledat v impériu
        </Button>
      </div>
    </Form>
  )
}
