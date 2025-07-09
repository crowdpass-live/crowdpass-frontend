import { useAccount, useExplorer } from '@starknet-react/core'
import { useCallback, useState } from 'react'
 
const CROWDPASS_CONTRACT =
  '0x04db787da1e9a4ef771846c1884dc43c6c0b4b989139f4a28e7306ce249c55f7'
 
export const TransferEth = () => {
  const [submitted, setSubmitted] = useState<boolean>(false)
  const { account } = useAccount()
  const explorer = useExplorer()
  const [txnHash, setTxnHash] = useState<string>()
 
  const execute = useCallback(
    async (
        event_name: string,
        event_Acronym: string,
        img_uri: string,
        description: string,
        organizer_name: string,
        event_type: string,
        event_category: string,
        event_location: string,
        event_schedule: any[],
        start_date: string,
        end_date: string,
        total_tickets: number,
        ticket_price: number
    ) => {
      if (!account) return
      setSubmitted(true)
      setTxnHash(undefined)
      try {
        const result = await account.execute([
          {
            contractAddress: CROWDPASS_CONTRACT,
            entrypoint: 'create_event',
            calldata: [
                event_name,
                event_Acronym,
                img_uri,
                description,
                organizer_name,
                event_type,
                event_category,
                event_location,
                event_schedule,
                start_date,
                end_date,
                total_tickets,
                ticket_price
            ],
          },
        ])
        setTxnHash(result.transaction_hash)
      } catch (e) {
        console.error(e)
      } finally {
        setSubmitted(false)
      }
    },
    [account],
  )
 
//   if (!account) return null
 
//   return (
//     <div>
//       <h2>Transfer ETH</h2>
//       <button onClick={() => execute('0x1C6BF52634000')} disabled={submitted}>
//         Transfer 0.005 ETH
//       </button>
//       {txnHash && (
//         <p>
//           Transaction hash:{' '}
//           <a
//             href={explorer.transaction(txnHash)}
//             target="blank"
//             rel="noreferrer"
//           >
//             {txnHash}
//           </a>
//         </p>
//       )}
//     </div>
//   )
}