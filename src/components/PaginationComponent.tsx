"use client"

import usePaginationStore from "@/hooks/usePaginationStore";
import { Pagination } from "@nextui-org/react";
import clsx from "clsx";
import { useEffect } from "react";

export default function PaginationComponent({ totalCount }: { totalCount: number }) {
    const { setPage, setPageSize, setPagination, pagination } = usePaginationStore(state => ({
        setPage: state.setPage,
        setPageSize: state.setPageSize,
        setPagination: state.setPagination,
        pagination: state.pagination
    }))

    const { pageNumber, pageSize, totalPages } = pagination

    useEffect(() => {
        setPagination(totalCount)
    }, [setPagination, totalCount])

    const start = (pageNumber - 1) * pageSize + 1
    const end = Math.min(pageNumber * pageSize, totalCount)

    return (
        <div className="border-t-2 w-full mt-6 px-4">
            <div className="flex flex-row justify-between items-center py-2">
                <div>{`Showing ${start}-${end} of ${totalCount} results`}</div>
                <Pagination
                    total={totalPages}
                    color="secondary"
                    page={pageNumber}
                    variant="bordered"
                    onChange={setPage}
                />
                <div className="flex flex-row gap-1 items-center">
                    Page size:
                    {[3, 6, 12].map(size => (
                        <div
                            onClick={() => setPageSize(size)}
                            key={size}
                            className={clsx("page-size-box", {
                                "bg-secondary text-white hover:bg-secondary hover:text-white": pageSize === size
                            })}>
                            {size}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}