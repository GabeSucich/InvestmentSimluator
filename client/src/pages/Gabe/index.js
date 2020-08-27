import React, { useState, useEffect } from 'react';
import Axios from "axios"
import ChartHandler from "../../components/ChartHandler"
import { Dropdown } from "semantic-ui-react"
import API from "../../utils/API"
import DataHandler from "../../components/DataHandler"


export default function Gabe() {

    const friendOptions = [
        {
          key: 'Jenny Hess',
          text: 'Jenny Hess',
          value: 'Jenny Hess',
          image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
        },
        {
          key: 'Elliot Fu',
          text: 'Elliot Fu',
          value: 'Elliot Fu',
          image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
        },
        {
          key: 'Stevie Feliciano',
          text: 'Stevie Feliciano',
          value: 'Stevie Feliciano',
          image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
        },
        {
          key: 'Christian',
          text: 'Christian',
          value: 'Christian',
          image: { avatar: true, src: '/images/avatar/small/christian.jpg' },
        },
        {
          key: 'Matt',
          text: 'Matt',
          value: 'Matt',
          image: { avatar: true, src: '/images/avatar/small/matt.jpg' },
        },
        {
          key: 'Justen Kitsune',
          text: 'Justen Kitsune',
          value: 'Justen Kitsune',
          image: { avatar: true, src: '/images/avatar/small/justen.jpg' },
        },
      ]


    return (
        <Dropdown
            text='Select Friend'
            fluid
            selection
            options={friendOptions}
        />
    )

}