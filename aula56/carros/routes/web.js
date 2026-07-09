import express from 'express'
import path from 'path'

export function registerWebRoutes(app, frontendDistPath) {
  app.use(express.static(frontendDistPath))

  app.use((req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({
        message: 'Rota da API não encontrada.',
      })
    }

    return res.sendFile(path.join(frontendDistPath, 'index.html'))
  })
}
