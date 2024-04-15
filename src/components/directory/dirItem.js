import Link from 'next/link'

export const Directory = ({folderName, linkPath}) => {
    return (<div className="pl-4 pt-2">
    <Link href={`${linkPath}`}><span className="align-middle pl-2">{folderName}</span></Link>
</div>)
}