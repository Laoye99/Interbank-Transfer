import { useState, useEffect } from 'react'

import Link from 'next/link'

// ** MUI Import
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// ** Demo Component Imports
import { BASE_URL } from 'src/configs/constanst'
import authConfig from 'src/configs/auth'
import axios from 'axios'


// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Dashboard = () => {
  const [data, setData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(true)
  console.log(data)

  const columns = [
    {
      title: 'institutionname',
      dataIndex: 'institutionname',
      key: 'institutionname',
    },
    {
      title: 'batchnumber',
      dataIndex: 'batchnumber',
      key: 'batchnumber',
    },
    {
      title: 'entrydate',
      dataIndex: 'entrydate',
      key: 'entrydate',
    },
    {
      title: 'transactionlocation',
      dataIndex: 'transactionlocation',
      key: 'transactionlocation',
    },
    {
      title: 'deleted_by',
      dataIndex: 'deleted_by',
      key: 'deleted_by',
    },
    {
      title: 'del_flg',
      dataIndex: 'del_flg',
      key: 'del_flg',
    },
    {
      title: 'institutioncode',
      dataIndex: 'institutioncode',
      key: 'institutioncode',
    },
    {
      title: 'cr_acc_suffix',
      dataIndex: 'cr_acc_suffix',
      key: 'cr_acc_suffix',
    },
    {
      title: 'cr_acct_num',
      dataIndex: 'cr_acct_num',
      key: 'cr_acct_num',
    },
    {
      title: 'del_date',
      dataIndex: 'del_date',
      key: 'del_date',
    },
    {
      title: 'del_flg',
      dataIndex: 'del_flg',
      key: 'del_flg',
    },
    {
      title: 'dr_acc_derivatn_flg',
      dataIndex: 'dr_acc_derivatn_flg',
      key: 'dr_acc_derivatn_flg',
    },

    {
      title: 'dr_acc_prefix',
      dataIndex: 'dr_acc_prefix',
      key: 'dr_acc_prefix',
    },
    {
      title: 'dr_acc_suffix',
      dataIndex: 'dr_acc_suffix',
      key: 'dr_acc_suffix',
    },
    {
      title: 'dr_acct_num',
      dataIndex: 'dr_acct_num',
      key: 'dr_acct_num',
    },
    {
      title: 'dr_acct_num',
      dataIndex: 'dr_acct_num',
      key: 'dr_acct_num',
    },
    {
      title: 'serial_num',
      dataIndex: 'serial_num',
      key: 'serial_num',
    },
    {
      title: 'service_id',
      dataIndex: 'service_id',
      key: 'service_id',
    },
    {
      title: 'sol_deriv_flag',
      dataIndex: 'sol_deriv_flag',
      key: 'sol_deriv_flag',
    },
    {
      title: 'sol_deriv_num_xters',
      dataIndex: 'sol_deriv_num_xters',
      key: 'sol_deriv_num_xters',
    },
    {
      title: 'sol_deriv_side_ind',
      dataIndex: 'sol_deriv_side_ind',
      key: 'sol_deriv_side_ind',
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'trxcrncy',
      dataIndex: 'trxcrncy',
      key: 'trxcrncy',
    },
    {
      title: 'use_msg_cr_acc_flg',
      dataIndex: 'use_msg_cr_acc_flg',
      key: 'use_msg_cr_acc_flg',
    },
  ]


  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    axios
      .get(`${BASE_URL}/switch/uploadfile?module=fin_inst&category=approved&fetch-content=true`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      .then(response => {
        console.log(response.data.data)
        setData(response.data.data)
        setSubmitLoading(false)
      })
      .catch(error => {
        // Handle the error here, e.g., show an error message or log the error
        console.error('Error fetching data:', error)
        setSubmitLoading(false)
      })
  }, [])

  return submitLoading ? (<Skeleton height={300} count={10} baseColor='#f4f4f4' />) :  (
    <ApexChartWrapper>
  <Grid container spacing={6}>
  <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
          <Typography variant='h5'>Approved Document</Typography>
        </Grid>
        <Table
              columns={columns}
              dataSource={data}
            />
   </Grid>
    </ApexChartWrapper>
  )
}

Dashboard.acl = {
  action: 'user',
  subject: 'user'
}

export default Dashboard
