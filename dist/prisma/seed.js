"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const managerPassword = await bcrypt.hash('manager123', 10);
    const storeKeeperPassword = await bcrypt.hash('keeper123', 10);
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
//# sourceMappingURL=seed.js.map