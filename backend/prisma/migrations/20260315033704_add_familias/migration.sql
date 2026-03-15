-- CreateTable
CREATE TABLE "Familia" (
    "id" SERIAL NOT NULL,
    "nomeResponsavel" TEXT NOT NULL,
    "cpf" TEXT,
    "endereco" TEXT,
    "telefone" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Familia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Acao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "dataDaAcao" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Acao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AcaoToFamilia" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Familia_cpf_key" ON "Familia"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "_AcaoToFamilia_AB_unique" ON "_AcaoToFamilia"("A", "B");

-- CreateIndex
CREATE INDEX "_AcaoToFamilia_B_index" ON "_AcaoToFamilia"("B");

-- AddForeignKey
ALTER TABLE "_AcaoToFamilia" ADD CONSTRAINT "_AcaoToFamilia_A_fkey" FOREIGN KEY ("A") REFERENCES "Acao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcaoToFamilia" ADD CONSTRAINT "_AcaoToFamilia_B_fkey" FOREIGN KEY ("B") REFERENCES "Familia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
