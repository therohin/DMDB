CREATE TABLE [dbo].[Actor] (
    [ActorId] INT      IDENTITY(1,1)      NOT NULL,
    [Name]     NVARCHAR (50)  NOT NULL,
    [Sex]      NVARCHAR (20)  NOT NULL,
    [DOB]      DATE           NULL,
    [Bio]      NVARCHAR (100) NULL,
    CONSTRAINT [PK_Actor] PRIMARY KEY CLUSTERED ([ActorId] ASC)
);

CREATE TABLE [dbo].[Producer] (
    [ProducerId] INT      IDENTITY(1,1)      NOT NULL,
    [Name]     NVARCHAR (50)  NOT NULL,
    [Sex]      NVARCHAR (20)  NOT NULL,
    [DOB]      DATE           NULL,
    [Bio]      NVARCHAR (100) NULL,
    CONSTRAINT [PK_Producer] PRIMARY KEY CLUSTERED ([ProducerId] ASC)
);

CREATE TABLE [dbo].[Movie] (
    [MovieId]       INT            IDENTITY (1, 1) NOT NULL,
    [Name]          NVARCHAR (50)  NOT NULL,
    [YearOfRelease] SMALLINT       NULL,
    [Plot]          NVARCHAR (100) NULL,
    [Poster]        VARBINARY(MAX)          NULL,
    [ProducerId]    INT            NULL,
    CONSTRAINT [PK_Movie] PRIMARY KEY CLUSTERED ([MovieId] ASC),
    CONSTRAINT [FK_Producer_Movie] FOREIGN KEY ([ProducerId]) REFERENCES [dbo].[Producer] ([ProducerId])
);


CREATE TABLE [dbo].[MovieActors] (
    [MovieId] INT NOT NULL,
    [ActorId] INT NOT NULL,
    CONSTRAINT [PK_MovieActor] PRIMARY KEY CLUSTERED ([MovieId] ASC, [ActorId] ASC),
    CONSTRAINT [FK_Movie_MovieActors] FOREIGN KEY ([MovieId]) REFERENCES [dbo].[Movie] ([MovieId]) ON DELETE CASCADE,
    CONSTRAINT [FK_Actor_MovieActors] FOREIGN KEY ([ActorId]) REFERENCES [dbo].[Actor] ([ActorId])
);
