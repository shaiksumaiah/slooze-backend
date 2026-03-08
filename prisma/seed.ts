import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const managerPassword = await bcrypt.hash('manager123', 10);
    const storeKeeperPassword = await bcrypt.hash('keeper123', 10);

    // Users
    const manager = await prisma.user.upsert({
        where: { email: 'manager@slooze.com' },
        update: {},
        create: {
            email: 'manager@slooze.com',
            password: managerPassword,
            role: 'MANAGER',
        },
    });

    const keeper = await prisma.user.upsert({
        where: { email: 'keeper@slooze.com' },
        update: {},
        create: {
            email: 'keeper@slooze.com',
            password: storeKeeperPassword,
            role: 'STORE_KEEPER',
        },
    });

    // Products
    const products = [
        { name: 'Red Coffee Beans', category: 'General', price: 25.5, stock: 100, sku: 'CB-RED-01' },
        { name: 'Assorted Nuts', category: 'Food', price: 15.0, stock: 50, sku: 'AN-02' },
        { name: 'Organic Honey', category: 'General', price: 12.99, stock: 75, sku: 'OH-03' },
    ];

    for (const p of products) {
        await prisma.product.upsert({
            where: { sku: p.sku },
            update: {},
            create: p,
        });
    }

    console.log({ manager, keeper, productCount: products.length });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
