-- CreateEnum
CREATE TYPE "Status" AS ENUM ('GUEST', 'MEMBER', 'BADGED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('RAPPER', 'SINGER', 'PRODUCER', 'DJ', 'ENGINEER');

-- CreateEnum
CREATE TYPE "Experience" AS ENUM ('ROOKIE', 'PLAYER', 'PRO', 'VETERAN');

-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('HIPHOP', 'ALTERNATIVE', 'BOOMBAP', 'EASTCOAST', 'HARDCORE', 'LOFI', 'OLDSCHOOL', 'POP', 'RNB', 'SOUTHERN', 'TRAP', 'UNDERGROUND', 'MIDWEST', 'WESTCOAST', 'INSTRUMENTAL');

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "udpatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "dob" TIMESTAMP(3),
    "name" TEXT,
    "location" TEXT,
    "badgeId" TEXT,
    "trackId" TEXT,
    "genres" "Genre"[],
    "bio" TEXT,
    "status" "Status" NOT NULL DEFAULT 'GUEST',
    "streamings" TEXT[],
    "imgSrc" TEXT,
    "username" TEXT,
    "roles" "Role"[],
    "experience" "Experience",
    "collabsReceived" TEXT[],
    "collabsSent" TEXT[],

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "udpatedAt" TIMESTAMP(3) NOT NULL,
    "released" TIMESTAMP(3) NOT NULL,
    "artistId" TEXT NOT NULL,
    "badgeId" TEXT,
    "studioId" TEXT,
    "name" TEXT NOT NULL,
    "genres" "Genre"[],
    "length" INTEGER NOT NULL,
    "numTracks" INTEGER NOT NULL,
    "imgSrc" TEXT,
    "streamSrc" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "released" TIMESTAMP(3),
    "artistId" TEXT NOT NULL,
    "albumId" TEXT,
    "badgeId" TEXT,
    "studioId" TEXT,
    "name" TEXT NOT NULL,
    "genres" "Genre"[],
    "length" INTEGER NOT NULL,
    "snippet" INTEGER NOT NULL DEFAULT 0,
    "plays" INTEGER NOT NULL DEFAULT 0,
    "imgSrc" TEXT,
    "streamSrc" TEXT,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Studio" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "udpatedAt" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "bio" TEXT,
    "badgeId" TEXT,
    "hours" TEXT,
    "rates" TEXT,
    "hasEngineer" BOOLEAN NOT NULL DEFAULT false,
    "hasMixing" BOOLEAN NOT NULL DEFAULT false,
    "hasVideo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Studio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArtistToStudio" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Features" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SharedTracks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SharedTracksWith" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SharedAlbums" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SharedAlbumsWith" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Artist_email_key" ON "Artist"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_badgeId_key" ON "Artist"("badgeId");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_username_key" ON "Artist"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Album_badgeId_key" ON "Album"("badgeId");

-- CreateIndex
CREATE UNIQUE INDEX "Album_imgSrc_key" ON "Album"("imgSrc");

-- CreateIndex
CREATE UNIQUE INDEX "Album_streamSrc_key" ON "Album"("streamSrc");

-- CreateIndex
CREATE UNIQUE INDEX "Track_badgeId_key" ON "Track"("badgeId");

-- CreateIndex
CREATE UNIQUE INDEX "Track_streamSrc_key" ON "Track"("streamSrc");

-- CreateIndex
CREATE UNIQUE INDEX "Studio_url_key" ON "Studio"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Studio_email_key" ON "Studio"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Studio_badgeId_key" ON "Studio"("badgeId");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_artistId_key" ON "Badge"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistToStudio_AB_unique" ON "_ArtistToStudio"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistToStudio_B_index" ON "_ArtistToStudio"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Features_AB_unique" ON "_Features"("A", "B");

-- CreateIndex
CREATE INDEX "_Features_B_index" ON "_Features"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SharedTracks_AB_unique" ON "_SharedTracks"("A", "B");

-- CreateIndex
CREATE INDEX "_SharedTracks_B_index" ON "_SharedTracks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SharedTracksWith_AB_unique" ON "_SharedTracksWith"("A", "B");

-- CreateIndex
CREATE INDEX "_SharedTracksWith_B_index" ON "_SharedTracksWith"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SharedAlbums_AB_unique" ON "_SharedAlbums"("A", "B");

-- CreateIndex
CREATE INDEX "_SharedAlbums_B_index" ON "_SharedAlbums"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SharedAlbumsWith_AB_unique" ON "_SharedAlbumsWith"("A", "B");

-- CreateIndex
CREATE INDEX "_SharedAlbumsWith_B_index" ON "_SharedAlbumsWith"("B");

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Studio" ADD CONSTRAINT "Studio_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToStudio" ADD CONSTRAINT "_ArtistToStudio_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToStudio" ADD CONSTRAINT "_ArtistToStudio_B_fkey" FOREIGN KEY ("B") REFERENCES "Studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Features" ADD CONSTRAINT "_Features_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Features" ADD CONSTRAINT "_Features_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedTracks" ADD CONSTRAINT "_SharedTracks_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedTracks" ADD CONSTRAINT "_SharedTracks_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedTracksWith" ADD CONSTRAINT "_SharedTracksWith_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedTracksWith" ADD CONSTRAINT "_SharedTracksWith_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedAlbums" ADD CONSTRAINT "_SharedAlbums_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedAlbums" ADD CONSTRAINT "_SharedAlbums_B_fkey" FOREIGN KEY ("B") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedAlbumsWith" ADD CONSTRAINT "_SharedAlbumsWith_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedAlbumsWith" ADD CONSTRAINT "_SharedAlbumsWith_B_fkey" FOREIGN KEY ("B") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
