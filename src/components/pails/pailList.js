import { PailIcon } from "@/resources/icons/pail"
import Link from 'next/link'
import PropTypes from 'prop-types'

export const PailList = ({pails, ...otherProps}) => {
    return(
        <div className="flex flex-col flex-wrap pt-2" data-testid="pailList">
            {pails.map(p => <div key={p.publicid} className="pl-4 pt-2">
                <Link href={`/pails/${p.name}`}>
                    <PailIcon className="pl-1 inline-block" dataTestId="pailIcon"/>
                    <span className="align-middle pl-2">{p.name}</span>
                </Link>
            </div>)}
        </div>
    )
}

PailList.propTypes = {
    pails: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        ownerLogin: PropTypes.string,
        publicid: PropTypes.string
    }))
}