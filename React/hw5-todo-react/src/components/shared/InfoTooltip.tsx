import { styled } from '@material-ui/core';
import ReactTooltip from "react-tooltip";

export const InfoTooltip = styled(ReactTooltip)({
    fontFamily: 'Roboto',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    alignItems: 'center',
    marginTop: '-5px !important',
    boxShadow: '0 0 10px lightgray',
    opacity: '1 !important',
    '& span': {
        fontWeight: 'bold'
    }
})