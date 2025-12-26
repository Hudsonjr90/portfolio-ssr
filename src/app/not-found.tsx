export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      textAlign: 'center' 
    }}>
      <h1>404 - Página não encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <a href="/" style={{ color: '#0ef6cc', textDecoration: 'none' }}>
        Voltar para a página inicial
      </a>
    </div>
  )
}