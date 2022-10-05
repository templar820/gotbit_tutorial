import React, {
  useEffect, useMemo, useRef, useState
} from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { MOBXDefaultProps } from '@globalTypes';
import './index.scss';
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import { useWeb3React } from "@web3-react/core"
import {injected} from "@components/web3/connector"
import {useChain, useMoralis} from "react-moralis";


const data = [
    {
        days: 30,
        APY: 110
    },
    {
        days: 60,
        APY: 120
    },
    {
        days: 90,
        APY: 125
    },
    {
        days: 180,
        APY: 140
    },
    {
        days: 365,
        APY: 160
    },
]

function PlacePage(props: MOBXDefaultProps) {
  const [type, setType] = useState(null)
  const [amount, setAmount] = useState(null)
  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  
  
  // const {isAuthenticated, authenticate, user, logout} = useMoralis()
  
  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }
  
  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }
  
  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected)
          localStorage.setItem('isWalletConnected', true)
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad()
  }, [])
  
  return (
    <div className="d-flex flex-column">
        <div className={"my-4"}>
            {data.map((el) => {
                return (
                    <FormControlLabel
                        value="bottom"
                        control={<Checkbox checked={type?.APY === el.APY} onClick={() => {
                          setType(el)
                        }} />}
                        label={el.days + " days; " + el.APY + " APY"}
                        labelPlacement="bottom"
                    />
                )
            })}
        </div>

        <TextField value={amount} label="Enter amount" onChange={(e) => setAmount(e.target.value)} />
        <Button
          onClick={() => {
            connect()
          }}
        >CONNECT WALLET</Button>
        {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
        <Button
          onClick={() => {
            disconnect()
          }}
        >Disconect</Button>


    </div>

  );
}

export default MobXRouterDecorator(PlacePage);
