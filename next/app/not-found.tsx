import Link from 'next/link';
 
export default function NotFound() {
  return (
    <div className="not_found" >
      <h3>Not Found</h3>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}