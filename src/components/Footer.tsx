import Container from "@/components/Container";

const Footer = () => {
  return (
    <footer className="mt-12 mb-8">
      <Container className="flex justify-between gap-4">
        <p className="text-sm">
          Invoicepedia &copy; {new Date().getFullYear()}
        </p>
        <p className="text-sm">created By Mohamed Benighil</p>
      </Container>
    </footer>
  );
};

export default Footer;
