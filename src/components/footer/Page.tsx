export default function Footer() {
  return (
    <footer className="bg-gray-200">
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-sm text-gray-700">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">ShopMart</span>. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

