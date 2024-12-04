import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class BookService {
  async createBook(createBookDto) {
    const searchIndex = this.removeWhitespace([
      createBookDto.title,
      createBookDto.author,
      createBookDto.subTitle,
    ]);

    return await prisma.book.create({
      data: { ...createBookDto, searchIndex },
    });
  }

  async findAllBooks() {
    return await prisma.book.findMany();
  }

  async searchBooks(q) {
    const searchText = q.replace(/\s+/g, '');
    return await prisma.book.findMany({
      where: {
        OR: [
          {
            searchIndex: { contains: searchText, mode: 'insensitive' },
          },
        ],
      },
    });
  }

  async findRandomBooks() {
    const query = `
    SELECT id, title, "subTitle", description, author, publisher, "coverImgUrl" 
    FROM "Book" ORDER BY RANDOM() LIMIT 3
    `;
    return await prisma.$queryRawUnsafe(query);
  }

  async findOneBook(id) {
    const book = await prisma.book.findUnique({
      where: { id },
    });
    if (!book) {
      throw new Error(`${id}번 도서는 존재하지 않습니다`);
    }
    return book;
  }

  async updateBook(id, dto) {
    const beforeUpdateData = await prisma.book.findUnique({
      where: { id },
    });

    if (!beforeUpdateData) {
      throw new Error(`${id}번 도서는 존재하지 않습니다`);
    }

    const searchIndex = this.removeWhitespace([
      dto.title ?? beforeUpdateData.title,
      dto.author ?? beforeUpdateData.author,
      dto.subTitle ?? beforeUpdateData.subTitle,
    ]);

    return await prisma.book.update({
      where: { id },
      data: { ...dto, searchIndex },
    });
  }

  async removeBook(id) {
    await prisma.book.delete({
      where: { id },
    });
  }

  removeWhitespace(value) {
    if (typeof value === 'string') {
      return value.replace(/\s+/g, '');
    }
    return value.map((str) => str.replace(/\s+/g, '')).join('');
  }
}
