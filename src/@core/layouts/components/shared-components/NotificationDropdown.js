
// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** MUI Imports
import DOMPurify from 'dompurify';
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu from '@mui/material/Menu'
import MuiMenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Util Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Config
import authConfig from 'src/configs/auth'
import axios from 'axios'

// ** Next Import
import { useRouter } from 'next/router'
import { BASE_URL } from 'src/configs/constanst'

// ** Styled Menu component
const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4.25),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0,
    '& .MuiMenuItem-root': {
      margin: 0,
      borderRadius: 0,
      padding: theme.spacing(4, 6),
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      }
    }
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: 349
})

// ** Styled Avatar component
const Avatar = styled(CustomAvatar)({
  width: 38,
  height: 38,
  fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)({
  fontWeight: 500,
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const ScrollWrapper = ({ children, hidden }) => {
  if (hidden) {
    return <Box sx={{ maxHeight: 349, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
  }
}

const NotificationDropdown = props => {
  // ** Props
  const { settings, notifications } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [apiDataa, setApiDataa] = useState([])

  // ** Hook
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  console.log(storedToken)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/notification`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json',
        },
      });

      // Check if the response data is an array before updating the state
      if (Array.isArray(response.data)) {
        setApiDataa(response.data) // Update the state with the fetched data
      } else {
        console.error('Invalid data format:', response.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsLoading(false)
    }
  }


  useEffect(() => {
    fetchData() // Invoke the function to fetch data
  }, [])

  // const handleDropdownClose = () => {
  //   setAnchorEl(null)
  // }

    // ** Hooks
    const router = useRouter();

    const handleDropdownClose = (event) => {
      console.log('oooooooo')


      // Check if the clicked element is the "Read All Notifications" button

      const isReadAllButton =
        event.target.tagName === 'BUTTON' &&
        event.target.textContent === 'Read All Notifications';

      if (isReadAllButton) {

        // Navigate to the "/notifications" route

        router.push('/notifications')
      }

      // Always close the dropdown

      setAnchorEl(null);
    }

  const RenderAvatar = ({ notification }) => {
    const { avatarAlt, avatarImg, avatarIcon, avatarText, avatarColor } = notification
    if (avatarImg) {
      return <Avatar alt={avatarAlt} src={avatarImg} />
    } else if (avatarIcon) {
      return (
        <Avatar skin='light' color={avatarColor}>
          {avatarIcon}
        </Avatar>
      )
    } else {
      return (
        <Avatar skin='light' color={avatarColor}>
          {getInitials(avatarText)}
        </Avatar>
      )
    }
  }

  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        <Badge
          color='error'
          variant='dot'
          invisible={!notifications.length}
          sx={{
            '& .MuiBadge-badge': { top: 4, right: 4, boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}` }
          }}
        >
          <Icon fontSize='1.625rem' icon='tabler:bell' />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{ cursor: 'default', userSelect: 'auto', backgroundColor: 'transparent !important' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography variant='h5' sx={{ cursor: 'text' }}>
              Notifications
            </Typography>
            <CustomChip skin='light' size='small' color='primary' label={`${apiDataa.length} New`} />
          </Box>
        </MenuItem>
        <ScrollWrapper hidden={hidden}>
        {console.log('apiDataa type:', typeof apiDataa)}
            {apiDataa?.map((item, index) => {

              // Parse the ISO date string into a JavaScript Date object

              const createdAtDate = new Date(item?.created_at)

              // Format the date as a string

              const formattedDate = new Intl.DateTimeFormat('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }).format(createdAtDate)

                // Log the message to identify the issue
           // console.log('Message:', item?.data?.message)

              return (
                <MenuItem key={index} disableRipple disableTouchRipple onClick={handleDropdownClose}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    {/* <RenderAvatar notification={notification} /> */}
                    <Box sx={{ mr: 4, ml: 2.5, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                        <MenuItemSubtitle variant="body2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.data?.message) }} />
                      </Box>
                    <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                      {formattedDate}
                    </Typography>
                  </Box>
                </MenuItem>
              )
            })}
          </ScrollWrapper>
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            borderBottom: 0,
            cursor: 'default',
            userSelect: 'auto',
            color: 'primary',
            backgroundColor: 'transparent !important',
            borderTop: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Button fullWidth variant='contained'  sx={{
          backgroundColor: '#f50606'}} onClick={handleDropdownClose}>
            Read All Notifications
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default NotificationDropdown


